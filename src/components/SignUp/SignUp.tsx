import React, { useState } from "react";
import "./styles.css";

import { apiClient } from "../../api/apiClient";
import { param } from "framer-motion/client";
import { toast } from "react-toastify";

interface SignUpModalProps {
  onClose: () => void;
  onSignIn: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ onClose, onSignIn }) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
    });

    await register({
      params: {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
      },
    });

    toast(" Form Submitted");
  };

  return (
    <div className="signup-modal-overlay" onClick={onClose}>
      <div className="signup-modal" onClick={(e) => e.stopPropagation()}>
        <button className="signup-modal-close" onClick={onClose} type="button">
          ×
        </button>

        <div className="signup-modal-header">
          <h2>Create Account</h2>
          <p>Sign up to continue booking your tickets</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="signup-form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              placeholder="Enter your First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="signup-form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              placeholder="Enter your Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="signup-form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="signup-form-group">
            <label htmlFor="email">Phone Number * </label>
            <input
              id="phoneNumber"
              type="tel"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          </div>

          <div className="signup-form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <div className="signup-form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="signup-submit-button">
            Sign Up
          </button>
        </form>

        <div className="signup-login-section">
          <span>Already have an account?</span>

          <button
            type="button"
            className="signup-login-button"
            onClick={onSignIn}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;

async function register({
  params,
}: {
  params: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string; // ? means optional
  };
}) {
  console.log("params");
  console.log(params);
  if (
    !params.email ||
    !params.password ||
    !params.firstName ||
    !params.lastName
  ) {
    throw new Response("Invalid input", { status: 400 });
  }

  try {
    const response = await apiClient.post(
      `/auth/register`,
      {
        email: params.email,
        password: params.password,
        firstName: params.firstName,
        lastName: params.lastName,
        phoneNumber: params.phoneNumber,
      },
      {
        withCredentials: true,
      },
    );
    return response;
  } catch (error: any) {
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to fetch shows.",
      { status: error.response?.status || 500 },
    );
  }
}
