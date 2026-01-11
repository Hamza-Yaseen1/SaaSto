"use client";

import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    { step: "01", title: "Sign Up", desc: "Start your account quickly and easily." },
    { step: "02", title: "Add Products", desc: "Add your items and customers effortlessly." },
    { step: "03", title: "Send Invoices", desc: "Share invoices and get paid faster." },
  ];

  return (
    <section className="max-w-6xl mx-auto py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How SaaSto Works</h2>
      <div className="grid md:grid-cols-3 gap-12">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03, y: -4 }}
            className="bg-white p-10 rounded-3xl shadow-2xl border-l-4 border-purple-500 hover:shadow-purple-300 transition text-center"
          >
            <div className="text-purple-500 text-4xl font-extrabold mb-4">{step.step}</div>
            <h3 className="text-xl md:text-2xl font-bold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
