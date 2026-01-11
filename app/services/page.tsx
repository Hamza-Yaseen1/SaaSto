"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Users,
  BarChart3,
  ShieldCheck,
  Clock,
  Sparkles,
} from "lucide-react";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-white px-6 md:px-20 py-24">

      {/* Header */}
      <section className="max-w-5xl mx-auto text-center mb-24">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold mb-6"
        >
          Everything You Need To  
          <span className="text-purple-500"> Run Your Business</span>
        </motion.h1>

        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
          SaaSto provides powerful yet simple tools to manage invoices, customers,
          and business growth — all in one place.
        </p>
      </section>

      {/* Core Services */}
      <section className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-10 mb-28">
        {[
          {
            icon: <FileText className="text-purple-500" size={36} />,
            title: "Smart Invoicing",
            desc: "Create professional invoices in seconds. Auto calculations, PDF export, and easy sharing.",
          },
          {
            icon: <Users className="text-purple-500" size={36} />,
            title: "Customer Management",
            desc: "Keep all customer records in one place. Track payments and history effortlessly.",
          },
          {
            icon: <BarChart3 className="text-purple-500" size={36} />,
            title: "Business Insights",
            desc: "Understand your performance with clear stats on sales, invoices, and revenue.",
          },
          {
            icon: <Clock className="text-purple-500" size={36} />,
            title: "Save Time",
            desc: "Reduce paperwork and manual tasks so you can focus on growing your business.",
          },
          {
            icon: <ShieldCheck className="text-purple-500" size={36} />,
            title: "Secure Data",
            desc: "Your data is protected with modern security and cloud infrastructure.",
          },
          {
            icon: <Sparkles className="text-purple-500" size={36} />,
            title: "Easy To Use",
            desc: "Designed for everyone — no technical knowledge required.",
          },
        ].map((service, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -8 }}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-gray-600">{service.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto mb-28">
        <h2 className="text-3xl font-bold text-center mb-16">
          How SaaSto Works
        </h2>

        <div className="grid md:grid-cols-3 gap-12 text-center">
          {[
            {
              step: "01",
              title: "Create Account",
              desc: "Sign up in seconds and set up your business profile.",
            },
            {
              step: "02",
              title: "Create Invoices",
              desc: "Add products, prices, and customers easily.",
            },
            {
              step: "03",
              title: "Share & Get Paid",
              desc: "Download PDFs or send invoices directly to customers.",
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-8 rounded-xl shadow-md"
            >
              <div className="text-purple-500 text-4xl font-extrabold mb-4">
                {step.step}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto text-center bg-purple-500 text-white p-14 rounded-3xl shadow-xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Start Using SaaSto Today
        </h2>
        <p className="text-purple-100 mb-8">
          No credit card required. Try all features free.
        </p>
        <a
          href="/register"
          className="inline-block bg-white text-purple-600 px-10 py-4 rounded-xl font-semibold hover:bg-purple-100 transition"
        >
          Get Started Free
        </a>
      </section>

    </main>
  );
}
