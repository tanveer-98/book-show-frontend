import React from "react";

interface IButton {
  className?: string;
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
}

export const Button = ({
  className = "",
  size = "default",
  children,
}: IButton) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    default: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };
  const baseClasses =
    "relative overflow-hidden rounded-full  font-medium focus:outline-none focus-visible:ring-2" +
    "focus-visible:ring-primary bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/25 ";
  return (
    <button className={`${sizeClasses[size]} ${baseClasses}`}>
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};
