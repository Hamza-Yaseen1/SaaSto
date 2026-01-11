"use client";

import { Users, FileText, Clock, Smile } from "lucide-react";
import { motion } from "framer-motion";

export default function Stats() {
  const stats = [
    {
      icon: <Users className="text-purple-500" size={32} />,
      number: "15k+",
      label: "Active Users",
    },
    {
      icon: <FileText className="text-purple-500" size={32} />,
      number: "50k+",
      label: "Invoices Created",
    },
    {
      icon: <Clock className="text-purple-500" size={32} />,
      number: "99.9%",
      label: "Uptime Reliability",
    },
    {
      icon: <Smile className="text-purple-500" size={32} />,
      number: "10k+",
      label: "Happy Customers",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
        Trusted by Thousands
      </h2>

      <div className="grid md:grid-cols-4 gap-10 text-center">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6 }}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col items-center gap-4"
          >
            <div>{stat.icon}</div>
            <h3 className="text-2xl md:text-3xl font-bold">{stat.number}</h3>
            <p className="text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
