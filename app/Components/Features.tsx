"use client";

import { Rocket, Users, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Features() {
  const features = [
    { icon: <Rocket className="text-purple-500" />, title: "Fast Invoicing", desc: "Generate professional invoices in seconds." },
    { icon: <Users className="text-purple-500" />, title: "Customer Management", desc: "Track your clients easily and efficiently." },
    { icon: <ShieldCheck className="text-purple-500" />, title: "Secure & Reliable", desc: "Cloud infrastructure with advanced security." },
  ];

  return (
    <section className="max-w-6xl mx-auto py-24 grid md:grid-cols-3 gap-12">
      {features.map((feature, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05, y: -6 }}
          className="bg-white p-10 rounded-3xl shadow-2xl hover:shadow-purple-300 transition"
        >
          <div className="mb-6">{feature.icon}</div>
          <h3 className="text-xl md:text-2xl font-bold mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.desc}</p>
        </motion.div>
      ))}
    </section>
  );
}
