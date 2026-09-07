import React from "react";

import { Footer } from "../Layout/Footer";
import PageTitle from "./PageTitle";
import errorImage from "../assets/util/error.png";
import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";
import { Navbar } from "../Layout/Navbar";

export default function ErrorPage() {
  const routeError = useRouteError();
  let errorTitle = "Oops! Something went wrong";
  let errorMessage = "An unexpected error occurred. Please try again later.";
  if (routeError) {
    errorTitle = routeError.status;
    errorMessage = routeError.data;
  }
  return (
    <div className="flex min-h-[980px] flex-col">
      <Navbar />
      {/* Main Content */}
      <main className="flex-grow">
        <div className="bg-normalbg dark:bg-darkbg font-primary py-12">
          <div className="mx-auto max-w-4xl px-4">
            <PageTitle title={errorTitle} />
          </div>
          <div className="dark:text-lighter flex flex-col items-center text-center text-gray-600">
            <p className="mx-auto mb-4 max-w-[576px] px-2 leading-6">
              {errorMessage}
            </p>
            <img
              src={errorImage}
              alt="Error"
              className="mx-auto mb-6 w-full max-w-[576px]"
            />
            <Link
              to="/home"
              className="dark:bg-light hover:bg-dark dark:hover:bg-lighter rounded-md bg-primary px-6 py-3 text-xl font-semibold text-white transition duration-200 dark:text-black"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
