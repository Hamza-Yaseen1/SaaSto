// /app/register/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function RegisterPage() {
  const [shopName, setShopName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!shopName || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("Registered User:", userCredential.user);

      setSuccess("Account created successfully!");
      setShopName("");
      setEmail("");
      setPassword("");
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
          Create Your Account
        </h1>

        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
        {success && <p className="text-green-500 mb-2 text-center">{success}</p>}

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          {/* Shop Name */}
          <div className="flex flex-col">
            <label htmlFor="shopName" className="text-gray-700 mb-1">
              Shop Name
            </label>
            <input
              type="text"
              id="shopName"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              placeholder="Your Shop Name"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Email */}
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

          {/* Password */}
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

          {/* Create Account Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            type="submit"
            className="bg-purple-500 text-white font-semibold py-2 rounded-lg mt-2 shadow-md hover:bg-purple-600 transition-all"
          >
            Create Account
          </motion.button>
        </form>

        <p className="text-gray-500 text-sm mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-purple-500 font-semibold">
            Login
          </a>
        </p>
      </motion.div>
    </main>
  );
}
