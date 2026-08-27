import { SiLeetcode } from "@icons-pack/react-simple-icons";
import React from "react";
import { LiaFacebook, LiaGithub, LiaInstagram, LiaLinkedin } from "react-icons/lia";

export const Socials = () => {
  return (
    <div>
      <div className="flex items-center gap-2">
        Follow :
        <span className="glass hover:text rounded-full p-2 hover:bg-primary/10">
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LiaLinkedin className="h-6 w-6" />
          </a>
        </span>
        <span className="glass hover:text rounded-full p-2 hover:bg-primary/10">
          <a
            href="https://www.github.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LiaGithub className="h-6 w-6" />
          </a>
        </span>
         <span className="glass hover:text rounded-full p-2 hover:bg-primary/10">
          <a
            href="https://www.instagram.com/tanveer_ahmed20"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LiaInstagram className="h-6 w-6" />
          </a>
        </span>
         <span className="glass hover:text rounded-full p-2 hover:bg-primary/10">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LiaFacebook className="h-6 w-6" />
          </a>
        </span>
        <span className="glass hover:text rounded-full p-2 hover:bg-primary/10">
          <a
            href="https://leetcode.com/u/tnvrahmed98/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiLeetcode className="h-6 w-6" />
          </a>
        </span>
      </div>
    </div>
  );
};
