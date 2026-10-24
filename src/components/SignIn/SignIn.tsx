import React, { useRef, useState } from "react";
import { apiClient } from "../../api/apiClient";
import { useAuth } from "../../Context/AuthContext";
import { toast } from "react-toastify";

interface SignInModalProps {
  onClose: () => void;
  onSignUp: () => void;
}
interface LoginResponse {
  data: {
    accessToken: string;
  };
}
const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
};
const SignInModal: React.FC<SignInModalProps> = ({ onClose, onSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const { login, loading } = useAuth();

  const emailRef = useRef(null);

  const handleEmailChange = (e: any) => {
    const updatedEmail = e.target.value;
    const emailError = document.getElementById("email-error-message");
    if (!validateEmail(updatedEmail)) {
      emailError?.classList.remove("hidden");
      setEmailValid(false);
    } else {
      emailError?.classList.add("hidden");
      setEmailValid(true);
    }

    setEmail(updatedEmail);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      login(email, password);
      onClose();
    } catch (error: any) {
      toast(error);
    }
  };

  const handleSignUp = () => {};

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="relative w-[400px] rounded-lg bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-black"
        >
          ×
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Sign In</h2>

          <p className="mt-1 text-sm text-gray-500">
            Sign in to continue booking your tickets
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              ref={emailRef}
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e)}
              placeholder="Enter your email"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-gray-600 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
            <span
              id="email-error-message"
              className="error-message hidden text-red-600"
            >
              * Email is Invalid
            </span>
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-black outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div className="text-right">
            <button
              type="button"
              className="text-sm text-red-500 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login */}
          <button
            type="submit"
            className="w-full rounded-md bg-red-500 py-2.5 font-semibold text-white transition hover:bg-red-600"
          >
            Sign In
          </button>
        </form>

        {/* Register */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            type="button"
            className="font-semibold text-red-500 hover:underline"
            onClick={() => onSignUp()}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;

// async function login({
//   params,
// }: {
//   params: { email: string; password: string };
// }) {
//   console.log("params");
//   console.log(params);
//   if (!params.email || !params.password) {
//     throw new Response("Email and Password in necessary", { status: 400 });
//   }

//   try {
//     const response = await apiClient.post(
//       `/auth/login`,
//       {
//         email: params.email,
//         password: params.password,
//       },
//       {
//         withCredentials: true,
//       },
//     );
//     return response;
//   } catch (error: any) {
//     throw new Response(
//       error.response?.data?.errorMessage ||
//         error.message ||
//         "Failed to fetch shows.",
//       { status: error.response?.status || 500 },
//     );
//   }
// }
