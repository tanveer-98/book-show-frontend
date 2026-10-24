import { useState, type FormEvent } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./Payment.css";

interface BookedSeat {
  id: number;
  rowNumber: string;
  seatNumber: string;
  seatType: string;
  price: number;
}

interface BookingState {
  showId: string;
  seats: BookedSeat[];
}

interface Attendee {
  name: string;
  age: string;
  phoneNumber: string;
  email?: string;
}

const Payment = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state as BookingState | null;
  const bookedSeats = booking?.seats ?? [];

  const [attendees, setAttendees] = useState<Attendee[]>(() =>
    bookedSeats.map(() => ({
      name: "",
      age: "",
      phoneNumber: "",
      email: "",
    })),
  );

  const ticketTotal = bookedSeats.reduce(
    (total, seat) => total + seat.price,
    0,
  );

  const updateAttendee = (
    index: number,
    field: keyof Attendee,
    value: string,
  ) => {
    setAttendees((currentAttendees) =>
      currentAttendees.map((attendee, attendeeIndex) =>
        attendeeIndex === index ? { ...attendee, [field]: value } : attendee,
      ),
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.error("Payment processing is not available yet.");
  };

  return (
    <main className="payment-page">
      <header className="payment-page__header">
        <p className="payment-page__eyebrow">Secure checkout</p>
        <h1>Complete your booking</h1>
        <p>Enter the details of each person attending the show.</p>
      </header>

      {bookedSeats.length === 0 ? (
        <section className="payment-empty">
          <h2>Booking details unavailable</h2>
          <p>
            Choose your seats again to continue. Your booking details are not
            available in this page session.
          </p>
          <button
            className="payment-button"
            type="button"
            onClick={() => navigate("/")}
          >
            Back to home
          </button>
        </section>
      ) : (
        <form className="payment-layout" onSubmit={handleSubmit}>
          <div className="payment-main">
            <section
              className="payment-card payment-show"
              aria-labelledby="show-heading"
            >
              <div className="payment-section-heading">
                <div>
                  <p className="payment-card__eyebrow">Your show</p>
                  <h2 id="show-heading">Show details</h2>
                </div>
                <span className="payment-booking-id">
                  Booking #{bookingId ?? "—"}
                </span>
              </div>

              <div className="payment-show__details">
                <div>
                  <span>Show</span>
                  <strong>
                    {booking?.showId
                      ? `Show ${booking.showId}`
                      : "Selected show"}
                  </strong>
                </div>
                <div>
                  <span>Seats booked</span>
                  <strong>
                    {bookedSeats.length}{" "}
                    {bookedSeats.length === 1 ? "seat" : "seats"}
                  </strong>
                </div>
              </div>

              <div className="payment-seats" aria-label="Booked seats">
                {bookedSeats.map((seat) => (
                  <span className="payment-seat" key={seat.id}>
                    <strong>
                      {seat.rowNumber}-{seat.seatNumber}
                    </strong>
                    <small>{seat.seatType}</small>
                  </span>
                ))}
              </div>
            </section>

            <section
              className="payment-card"
              aria-labelledby="attendees-heading"
            >
              <div className="payment-section-heading">
                <div>
                  <p className="payment-card__eyebrow">Attendee information</p>
                  <h2 id="attendees-heading">Who’s attending?</h2>
                </div>
                <span className="payment-count">
                  {bookedSeats.length} required
                </span>
              </div>

              <div className="payment-attendees">
                {bookedSeats.map((seat, index) => (
                  <fieldset className="payment-attendee" key={seat.id}>
                    <legend>
                      <span>Person {index + 1}</span>
                      <span>
                        {seat.rowNumber}-{seat.seatNumber}
                      </span>
                    </legend>
                    <div className="payment-attendee__grid">
                      <label className="payment-field payment-field--wide">
                        Full name
                        <input
                          autoComplete="name"
                          name={`attendee-${index}-name`}
                          placeholder="Enter full name"
                          required
                          value={attendees[index]?.name ?? ""}
                          onChange={(event) =>
                            updateAttendee(index, "name", event.target.value)
                          }
                        />
                      </label>
                      <label className="payment-field">
                        Age
                        <input
                          type="number"
                          name={`attendee-${index}-age`}
                          placeholder="Age"
                          min="1"
                          max="120"
                          required
                          value={attendees[index]?.age ?? ""}
                          onChange={(event) =>
                            updateAttendee(index, "age", event.target.value)
                          }
                        />
                      </label>
                      <label className="payment-field">
                        Phone number
                        <input
                          autoComplete="tel"
                          type="tel"
                          name={`attendee-${index}-phone`}
                          placeholder="Enter phone number"
                          required
                          value={attendees[index]?.phoneNumber ?? ""}
                          onChange={(event) =>
                            updateAttendee(
                              index,
                              "phoneNumber",
                              event.target.value,
                            )
                          }
                        />
                      </label>
                      <label className="payment-field payment-field--wide">
                        Email address
                        <input
                          autoComplete="email"
                          type="email"
                          name={`attendee-${index}-email`}
                          placeholder="Enter email address"
                          required
                          value={attendees[index]?.email ?? ""}
                          onChange={(event) =>
                            updateAttendee(index, "email", event.target.value)
                          }
                        />
                      </label>
                    </div>
                  </fieldset>
                ))}
              </div>
            </section>
          </div>

          <aside
            className="payment-card payment-summary"
            aria-labelledby="summary-heading"
          >
            <div>
              <p className="payment-card__eyebrow">Order total</p>
              <h2 id="summary-heading">Cost breakdown</h2>
            </div>

            <div className="payment-summary__lines">
              {bookedSeats.map((seat) => (
                <div className="payment-summary__line" key={seat.id}>
                  <span>
                    {seat.rowNumber}-{seat.seatNumber} · {seat.seatType}
                  </span>
                  <strong>₹{seat.price.toLocaleString("en-IN")}</strong>
                </div>
              ))}
              <div className="payment-summary__line payment-summary__subtotal">
                <span>Ticket subtotal</span>
                <strong>₹{ticketTotal.toLocaleString("en-IN")}</strong>
              </div>
            </div>

            <div className="payment-summary__total">
              <span>Total payable</span>
              <strong>₹{ticketTotal.toLocaleString("en-IN")}</strong>
            </div>
            <button className="payment-button" type="submit">
              Proceed to payment
            </button>
            <p className="payment-summary__note">
              Your seats are reserved while you complete checkout.
            </p>
          </aside>
        </form>
      )}
    </main>
  );
};

export default Payment;
