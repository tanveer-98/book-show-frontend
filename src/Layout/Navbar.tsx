import React, { useEffect } from "react";
import { Button } from "../components/Button";
import { Menu, X } from "lucide-react";
import SearchBox from "../components/SearchBox";

const navLinks = ["About", "Projects", "Experience", "Blog"];

export const Navbar = () => {
  const scrollToSection = (id: any): any => {
    const section = document.querySelector(id);
    if (section) {
      document.querySelector(id).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => setOpen(!open);
  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-transparent pb-5">
      <nav
        className={`container mx-auto flex items-center justify-between border border-transparent px-6 py-4 ${scrolled ? "p-4 transition-all duration-1000" : ""}`}
      >
        <div className="text-2xl font-bold tracking-tighter hover:cursor-pointer hover:text-primary">
          <a href="#home">
            BookSho <span className="font-bold">.</span>
          </a>
        </div>
      </nav>
    </header>
  );
};
