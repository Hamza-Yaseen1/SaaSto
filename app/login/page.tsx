// /app/login/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in user:", userCredential.user);

      // Redirect to dashboard or home page
      router.push("/dashboard");
    } catch (err: any) {
      // Clean up Firebase error messages
      let message = err.message
        .replace("Firebase:", "")
        .replace(/\(auth\/.*\)\.?/i, "")
        .trim();
      setError(message);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-purple-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Login to Your Account
        </h1>

        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* Email Input */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            type="submit"
            className="bg-purple-500 text-white font-semibold py-2 rounded-lg mt-2 shadow-md hover:bg-purple-600 transition-all"
          >
            Login
          </motion.button>
        </form>

        <p className="text-gray-500 text-sm mt-4 text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-purple-500 font-semibold">
            Sign up
          </a>
        </p>
      </motion.div>
    </main>
  );
}
