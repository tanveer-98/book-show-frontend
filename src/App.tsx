import { Outlet } from "react-router-dom";
import { Footer } from "./Layout/Footer";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
