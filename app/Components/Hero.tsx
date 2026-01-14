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
    <main className="min-h-[100svh] bg-gradient-to-b from-white via-purple-50 to-white flex items-center px-4 sm:px-6 md:px-20">
      <section className="w-full max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 md:gap-24">

        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-900 leading-snug">
            Committed To People{" "}
            <span className="text-purple-500 block sm:inline">
              Committed To The Future
            </span>
          </h1>

          <p className="text-gray-600 text-sm sm:text-base md:text-lg mt-4 mb-8 max-w-xl mx-auto md:mx-0">
            Enhance your workflow and engage with your audience effectively.
          </p>

          {/* Buttons */}
          {!isLoggedIn ? (
            <>
              <div className="flex flex-col sm:flex-row gap-4 sm:justify-center md:justify-start">
                <Link href="/register" className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="w-full sm:w-auto bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md"
                  >
                    Try Free <ArrowRight size={18} />
                  </motion.button>
                </Link>

                <Link href="/login" className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="w-full sm:w-auto border border-purple-500 text-purple-500 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50"
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
              <Link href="/dashboard" className="inline-block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-md"
                >
                  Go to Dashboard <ArrowRight size={18} />
                </motion.button>
              </Link>

              <p className="mt-4 text-sm text-gray-600">
                You’re logged in. Create unlimited invoices 🚀
              </p>
            </>
          )}

          {/* Stats */}
          <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-4">
            <Stat icon={<Users />} value="15k+" label="Active Users" />
            <Stat icon={<Download />} value="30k" label="Downloads" />
            <Stat icon={<Smile />} value="10k" label="Happy Clients" />
          </div>
        </div>

        {/* Illustration */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-purple-100 rounded-full flex items-center justify-center shadow-lg motion-safe:animate-bounce">
            <ArrowRight size={44} className="text-purple-500" />
          </div>
        </motion.div>

      </section>
    </main>
  );
}

function Stat({ icon, value, label }: any) {
  return (
    <div className="flex items-center gap-3 bg-purple-100 px-4 py-3 rounded-lg shadow-sm min-w-[150px]">
      <span className="text-purple-500">{icon}</span>
      <div>
        <h3 className="font-bold text-lg">{value}</h3>
        <p className="text-gray-500 text-sm">{label}</p>
      </div>
    </div>
  );
}
