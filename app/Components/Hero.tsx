"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Users, Download, Smile } from "lucide-react";
import { motion } from "framer-motion";
import { auth } from "@/app/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Hero() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-white flex flex-col justify-center items-center px-6 md:px-20">
      <section className="flex flex-col-reverse md:flex-row items-center w-full max-w-7xl gap-12 md:gap-24">
        {/* Text Content */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-snug">
            Committed To People{" "}
            <span className="text-purple-500">Committed To The Future</span>
          </h1>

          <p className="text-gray-600 text-base sm:text-lg mb-8">
            Enhance your workflow and engage with your audience effectively.
          </p>

          {/* Buttons */}
          {!isLoggedIn ? (
            <>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    Try Free <ArrowRight size={18} />
                  </motion.button>
                </Link>

                <Link href="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="border border-purple-500 hover:bg-purple-50 text-purple-500 px-6 py-3 rounded-lg font-semibold transition-all"
                  >
                    Login
                  </motion.button>
                </Link>
              </div>

              <p className="mt-4 text-sm font-medium text-purple-600">
                Unlimited invoices. 100% Free.
              </p>
            </>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    Go to Dashboard <ArrowRight size={18} />
                  </motion.button>
                </Link>
              </div>

              <p className="mt-4 text-sm text-gray-600">
                You’re logged in. Create unlimited invoices 🚀
              </p>
            </>
          )}

          {/* Stats */}
          <div className="mt-12 flex gap-4 sm:gap-6">
            <Stat icon={<Users />} value="15k+" label="Active Users" />
            <Stat icon={<Download />} value="30k" label="Total Downloads" />
            <Stat icon={<Smile />} value="10k" label="Happy Customers" />
          </div>
        </div>

        {/* Animated Illustration */}
        <motion.div
          className="flex-1 flex justify-center items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-64 sm:w-72 md:w-80 h-64 sm:h-72 md:h-80 bg-purple-100 rounded-full flex justify-center items-center shadow-lg animate-bounce">
            <ArrowRight size={48} className="text-purple-500" />
          </div>
        </motion.div>
      </section>
    </main>
  );
}

function Stat({ icon, value, label }: any) {
  return (
    <div className="flex items-center gap-3 bg-purple-100 px-5 py-3 rounded-lg shadow-sm">
      <span className="text-purple-500">{icon}</span>
      <div>
        <h3 className="font-bold text-lg sm:text-xl">{value}</h3>
        <p className="text-gray-500 text-sm sm:text-base">{label}</p>
      </div>
    </div>
  );
}
