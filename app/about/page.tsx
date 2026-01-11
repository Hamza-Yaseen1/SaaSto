"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Rocket, Users, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-white px-6 md:px-20 py-24">

      {/* Hero Header */}
      <section className="max-w-5xl mx-auto text-center mb-24">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6"
        >
          Building Simple Tools For  
          <span className="text-purple-500"> Real Businesses</span>
        </motion.h1>

        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
          SaaSto is designed to remove complexity from invoicing, customer management,
          and daily business operations — so you can focus on growth, not paperwork.
        </p>
      </section>

      {/* Story Section */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 mb-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            We started SaaSto after noticing that many small shop owners and freelancers
            still relied on handwritten bills, Excel sheets, or expensive tools built
            for large companies.
          </p>
          <p className="text-gray-600">
            Our goal was simple: create a fast, affordable, and easy-to-use system that
            anyone can understand — even without technical knowledge.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-10 rounded-2xl shadow-xl"
        >
          <ul className="space-y-6">
            <li className="flex gap-4">
              <Rocket className="text-purple-500" />
              <span>Built for speed and simplicity</span>
            </li>
            <li className="flex gap-4">
              <Users className="text-purple-500" />
              <span>Designed for small businesses</span>
            </li>
            <li className="flex gap-4">
              <ShieldCheck className="text-purple-500" />
              <span>Secure and reliable infrastructure</span>
            </li>
          </ul>
        </motion.div>
      </section>

      {/* Values */}
      <section className="max-w-6xl mx-auto mb-24">
        <h2 className="text-3xl font-bold text-center mb-12">What We Believe In</h2>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
            <Sparkles className="text-purple-500 mb-4" size={36} />
            <h3 className="font-bold text-xl mb-2">Clarity</h3>
            <p className="text-gray-600">
              Simple interfaces. Clear actions. No confusing dashboards.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
            <Users className="text-purple-500 mb-4" size={36} />
            <h3 className="font-bold text-xl mb-2">People First</h3>
            <p className="text-gray-600">
              Built with real users in mind — not just features.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
            <ShieldCheck className="text-purple-500 mb-4" size={36} />
            <h3 className="font-bold text-xl mb-2">Trust</h3>
            <p className="text-gray-600">
              Your data is protected and respected at all times.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to simplify your business?
        </h2>
        <p className="text-gray-600 mb-8">
          Join thousands of businesses already using SaaSto.
        </p>
        <a
          href="/register"
          className="inline-block bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-xl font-semibold transition"
        >
          Get Started Free
        </a>
      </section>

    </main>
  );
}
