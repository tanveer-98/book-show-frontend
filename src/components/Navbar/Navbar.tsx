import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import SignInModal from "../SignIn/SignIn";
import "./styles.css";
import SignUpModal from "../SignUp/SignUp";
import { useAuth } from "../../Context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const {isAuthenticated , logout} = useAuth();
  const [showSignInModal, setSignInModalShow] = useState<boolean>(false);
  const [showSignUpModal, setSignUpModalShow] = useState<boolean>(false);

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
          {
           !isAuthenticated ?  
              <button
                className="login-button"
                onClick={() => setSignInModalShow(!showSignInModal)}
              >
                Sign In
              </button>
            :
            <button className="login-button" onClick ={()=>logout()}>Logout</button>
          }

        </div>
      </nav>

      {/* Signin MOdal */}
      <div
        className={`${showSignInModal ? "block" : "hidden"} h-screen w-screen`}
      >
        <SignInModal
          onClose={() => setSignInModalShow(false)}
          onSignUp={() => {
            setSignUpModalShow(true);
            setSignInModalShow(false);
          }}
        />
      </div>

      {/* Sign Up Modal */}

      {showSignUpModal && (
        <SignUpModal
          onClose={() => setSignUpModalShow(false)}
          onSignIn={() => {
            setSignUpModalShow(false);
            setSignInModalShow(true);
          }}
        />
      )}
    </React.Fragment>
  );
};

export default Navbar;
