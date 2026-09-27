import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import SignInModal from "../SignIn/SignIn";
import "./styles.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [showSignInModal, setSignInModalShow] = useState<boolean>(false);

  const redirectHome = () => {
    navigate("/home");
  };

  return (
    <React.Fragment>
      <nav className="navbar">
        <div
          className="logo"
          onClick={() => redirectHome()}
          style={{ cursor: "pointer" }}
        >
          Book<span>The</span>Show
        </div>

        <div className="nav-links">
          {/* <a href="#">Movies</a> */}
          {/* <a href="#">Events</a>
          <a href="#">Sports</a>
          <a href="#">Plays</a> */}
        </div>

        <div className="nav-right">
          <button className="search-button">🔍</button>

          <button
            className="login-button"
            onClick={() => setSignInModalShow(!showSignInModal)}
          >
            Sign In
          </button>
        </div>
      </nav>

      <div
        className={`${showSignInModal ? "block" : "hidden"} h-screen w-screen`}
      >
        <SignInModal onClose={() => setSignInModalShow(false)} />
      </div>
    </React.Fragment>
  );
};

export default Navbar;
