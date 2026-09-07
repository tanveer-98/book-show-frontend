import { useNavigate } from "react-router-dom";
import "./styles.css";

const Navbar = () => {
  const navigate = useNavigate();

  const redirectHome = () => {
    navigate("/home");
  };

  return (
    <nav className="navbar">
      <div
        className="logo"
        onClick={() => redirectHome()}
        style={{ cursor: "pointer" }}
      >
        Book<span>My</span>Show
      </div>

      <div className="nav-links">
        <a href="#">Movies</a>
        <a href="#">Events</a>
        <a href="#">Sports</a>
        <a href="#">Plays</a>
      </div>

      <div className="nav-right">
        <button className="search-button">🔍</button>

        <button className="login-button">Sign In</button>
      </div>
    </nav>
  );
};

export default Navbar;
