"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Users, Download, Smile } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-white flex flex-col justify-center items-center px-6 md:px-20">
      
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center w-full max-w-7xl gap-12 md:gap-24">
        
        {/* Text Content */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-snug">
            Committed To People{" "}
            <span className="text-purple-500">Committed To The Future</span>
          </h1>
          <p className="text-gray-600 text-base sm:text-lg mb-8">
            An enim nullam tempor sapien gravida donec enim ipsum porta justo congue magna at. Enhance your workflow and engage with your audience effectively.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md transition-all"
            >
              Try Free <ArrowRight size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="border border-purple-500 hover:bg-purple-50 text-purple-500 px-6 py-3 rounded-lg font-semibold transition-all"
            >
              Login
            </motion.button>
          </div>

          {/* Stats */}
          <div className="mt-12 flex  gap-4 sm:gap-6">
            <div className="flex items-center gap-3 bg-purple-100 px-5 py-3 rounded-lg shadow-sm">
              <Users className="text-purple-500" />
              <div>
                <h3 className="font-bold text-lg sm:text-xl">15k+</h3>
                <p className="text-gray-500 text-sm sm:text-base">Active Users</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-yellow-100 px-5 py-3 rounded-lg shadow-sm">
              <Download className="text-yellow-500" />
              <div>
                <h3 className="font-bold text-lg sm:text-xl">30k</h3>
                <p className="text-gray-500 text-sm sm:text-base">Total Downloads</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-green-100 px-5 py-3 rounded-lg shadow-sm">
              <Smile className="text-green-500" />
              <div>
                <h3 className="font-bold text-lg sm:text-xl">10k</h3>
                <p className="text-gray-500 text-sm sm:text-base">Happy Customers</p>
              </div>
            </div>
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
