"use client";

import { motion } from "framer-motion";
import { Smile } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    { name: "Ali Khan", role: "Shop Owner", message: "SaaSto saved me hours of work every week!" },
    { name: "Sara Ahmed", role: "Freelancer", message: "Intuitive dashboard and easy invoicing." },
    { name: "Hassan Raza", role: "Entrepreneur", message: "My customer management is finally organized." },
  ];

  return (
    <section className="max-w-6xl mx-auto py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">What Our Users Say</h2>
      <div className="grid md:grid-cols-3 gap-12">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6 }}
            className="bg-gradient-to-tr from-purple-50 to-purple-100 p-10 rounded-3xl shadow-2xl text-center"
          >
            <Smile className="mx-auto text-purple-500 mb-4" size={32} />
            <p className="text-gray-700 mb-4">"{t.message}"</p>
            <h4 className="font-bold text-lg">{t.name}</h4>
            <p className="text-purple-500 text-sm">{t.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
