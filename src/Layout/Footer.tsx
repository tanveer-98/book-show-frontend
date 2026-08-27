import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { LiaGithub } from "react-icons/lia";

export const Footer = () => {
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
        {/* Left */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold">Tanveer Ahmed</h3>
          <p className="mt-2 text-sm text-gray-400">
            Building thoughtful digital experiences with code.
          </p>
        </div>

        {/* Center Navigation */}
        <nav className="flex gap-6 text-sm text-gray-400">
          <a href="#about" className="transition hover:text-white">
            About
          </a>
          <a href="#projects" className="transition hover:text-white">
            Projects
          </a>
          <a href="#contact" className="transition hover:text-white">
            Contact
          </a>
        </nav>

        {/* Right Socials */}
        <div className="flex gap-5 text-gray-400">
          <a
            href="https://github.com/tanveer-98"
            target="_blank"
            className="transition hover:text-white"
          >
            <LiaGithub className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/tanveer-ahmed-589055112/"
            target="_blank"
            className="transition hover:text-white"
          >
            <FaLinkedin className="h-6 w-6" />
          </a>
          <a
            href="https://www.instagram.com/tanveer_ahmed20/"
            target="_blank"
            className="transition hover:text-white"
          >
            <FaInstagram className="h-6 w-6" />
          </a>
          <a
            href="https://www.facebook.com/tanveer.ahmed.9"
            target="_blank"
            className="transition hover:text-white"
          >
            <FaFacebook className="h-6 w-6" />
          </a>
        </div>
      </div>

      <div className="pb-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Tanveer Ahmed. Crafted with React &
        Tailwind.
      </div>
    </footer>
  );
};
