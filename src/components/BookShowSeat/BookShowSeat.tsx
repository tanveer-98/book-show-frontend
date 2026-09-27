import { useMemo, useState } from "react";
import "./styles.css";
import { apiClient } from "../../api/apiClient";

import { useLoaderData, useParams } from "react-router-dom";

type SeatType = "SILVER" | "GOLD" | "PLATINUM";

interface SeatRow {
  label: string;
  type: SeatType;
  price: number;
}

interface Seat {
  id: string;
  number: number;
  row: SeatRow;
}

const seatRows: SeatRow[] = [
  ...Array.from({ length: 4 }, (_, index) => ({
    label: `${String.fromCharCode(65 + index)}`,
    type: "silver" as const,
    price: 300,
  })),

  ...Array.from({ length: 3 }, (_, index) => ({
    label: String.fromCharCode(69 + index),
    type: "gold" as const,
    price: 350,
  })),

  ...Array.from({ length: 3 }, (_, index) => ({
    label: String.fromCharCode(72 + index),
    type: "platinum" as const,
    price: 700,
  })),
];

const seats: Seat[] = seatRows.flatMap((row) =>
  Array.from({ length: 10 }, (_, index) => ({
    id: `${row.label}-${index + 1}`,
    number: index + 1,
    row,
  })),
);

interface ShowSeat {
  id: number;
  rowNumber: string;
  seatNumber: string;
  seatType: string;
  price: number;
}

const BookShowSeat = () => {
  console.log("seats ");
  console.log(seats);

  console.log("SEAT ROWS: ");
  console.log(seatRows);
  const showseats: ShowSeat[] = useLoaderData();

  console.log("show seats : ");
  console.log(showseats);

  const seats2 = showseats.map((showseat: ShowSeat) => {
    const seatRow = {
      label: showseat.rowNumber,
      type: showseat.seatType,
      price: showseat.price,
    };
    const seat = {
      id: showseat.rowNumber + "-" + showseat.seatNumber,
      number: showseat.seatNumber,
      row: seatRow,
    };
    return seat;
  });

  console.log("seats2");
  console.log(seats2);

  const { showId } = useParams<{ showId: string }>();
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);

  const selectedSeats = useMemo(
    () =>
      showseats.filter((seat) => {
        return selectedSeatIds.includes(seat.rowNumber + "-" + seat.seatNumber);
      }),
    [selectedSeatIds],
  );

  const totalPrice = selectedSeats.reduce(
    (total, seat) => total + seat.price,
    0,
  );

  const toggleSeat = (seatId: string) => {
    console.log("seatId" + seatId);
    console.log("selected seats : ");
    console.log(selectedSeats);

    console.log("Total price : " + totalPrice);

    setSelectedSeatIds((currentSeats) =>
      currentSeats.includes(seatId)
        ? currentSeats.filter((currentSeatId) => currentSeatId !== seatId)
        : [...currentSeats, seatId],
    );
    console.log("selected seat Id : ");
    console.log(selectedSeatIds);
  };

  return (
    <main className="seat-page">
      <header className="seat-page__header">
        <div>
          <p className="seat-page__eyebrow">Show {showId}</p>
          <h1>Choose your seats</h1>
          <p>Select your seats, then review your order before checkout.</p>
        </div>
        <div className="seat-page__count" aria-live="polite">
          <strong>{selectedSeats.length}</strong>
          <span>seats selected</span>
        </div>
      </header>

      <div className="seat-page__layout">
        <section className="seat-map-panel" aria-label="Seat selection">
          <div className="screen">SCREEN</div>
          <div className="seat-map">
            {seatRows.map((row) => (
              <div className="seat-row" key={row.label}>
                <span className="seat-row__label">{row.label}</span>
                <div className="seat-row__seats">
                  {seats2
                    .filter((seat) => seat.row.label === row.label)
                    .map((seat) => {
                      const isSelected = selectedSeatIds.includes(seat.id);
                      return (
                        <button
                          className={`seat seat--${seat.row.type} ${isSelected ? "seat--selected" : ""}`}
                          key={seat.id}
                          type="button"
                          aria-label={`${row.type} row ${row.label}, seat ${seat.number}, ${row.price} rupees`}
                          aria-pressed={isSelected}
                          onClick={() => toggleSeat(seat.id)}
                        >
                          {seat.number}
                        </button>
                      );
                    })}
                </div>
                <span className="seat-row__label" aria-hidden="true">
                  {row.label}
                </span>
              </div>
            ))}
          </div>
          <div className="seat-legend" aria-label="Seat prices">
            <span>
              <i className="legend-dot legend-dot--silver" />
              Silver <b>₹300</b>
            </span>
            <span>
              <i className="legend-dot legend-dot--gold" />
              Gold <b>₹400</b>
            </span>
            <span>
              <i className="legend-dot legend-dot--platinum" />
              Platinum <b>₹700</b>
            </span>
            <span>
              <i className="legend-dot legend-dot--selected" />
              Selected
            </span>
          </div>
        </section>

        <aside className="booking-summary">
          <p className="booking-summary__eyebrow">Your booking</p>
          <h2>Order summary</h2>
          <div className="booking-summary__rule" />
          {selectedSeats.length > 0 ? (
            <div className="booking-summary__seats">
              <p>Selected seats</p>
              <div>
                {selectedSeats.map((seat) => (
                  <span key={seat.id}>
                    {seat.rowNumber + "-" + seat.seatNumber}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <p className="booking-summary__empty">
              Your selected seats will appear here.
            </p>
          )}
          <div className="booking-summary__total">
            <span>Total</span>
            <strong>₹{totalPrice.toLocaleString("en-IN")}</strong>
          </div>
          <button
            className="booking-summary__button"
            type="button"
            disabled={selectedSeats.length === 0}
          >
            Continue to payment
          </button>
        </aside>
      </div>
    </main>
  );
};

export default BookShowSeat;

export async function showSeatsLoader({
  params,
}: {
  params: { showId?: string };
}) {
  if (!params.showId) {
    throw new Response("Show Id is required", { status: 400 });
  }

  try {
    const response = await apiClient.get(`/showseat/shows/${params.showId}`);
    return Array.isArray(response.data)
      ? response.data
      : response.data.shows || [];
  } catch (error: any) {
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to fetch shows.",
      { status: error.response?.status || 500 },
    );
  }
}
