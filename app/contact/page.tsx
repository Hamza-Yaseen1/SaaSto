"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  HelpCircle,
  Briefcase,
} from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-white px-6 md:px-20 py-24">

      {/* Header */}
      <section className="max-w-5xl mx-auto text-center mb-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold mb-6"
        >
          Contact <span className="text-purple-500">SaaSto</span>
        </motion.h1>

        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
          Need help, have feedback, or want to work with us?  
          Our team usually replies within <strong>24 hours</strong>.
        </p>
      </section>

      {/* Intent Cards */}
      <section className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-24">
        {[
          {
            icon: <HelpCircle className="text-purple-500" />,
            title: "Support",
            desc: "Having trouble using SaaSto? We’ll help you.",
          },
          {
            icon: <Briefcase className="text-purple-500" />,
            title: "Business",
            desc: "Interested in partnerships or enterprise plans?",
          },
          {
            icon: <MessageSquare className="text-purple-500" />,
            title: "Feedback",
            desc: "Tell us what we can improve or add next.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6 }}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Main Section */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-2xl font-bold">Reach Us Directly</h2>

          <div className="flex gap-4">
            <Mail className="text-purple-500" />
            <div>
              <h4 className="font-semibold">Email</h4>
              <p className="text-gray-600">support@saasto.com</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Phone className="text-purple-500" />
            <div>
              <h4 className="font-semibold">Phone</h4>
              <p className="text-gray-600">+92 300 1234567</p>
            </div>
          </div>

          <div className="flex gap-4">
            <MapPin className="text-purple-500" />
            <div>
              <h4 className="font-semibold">Office</h4>
              <p className="text-gray-600">Karachi, Pakistan</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Clock className="text-purple-500" />
            <div>
              <h4 className="font-semibold">Working Hours</h4>
              <p className="text-gray-600">Mon – Sat · 10am – 7pm</p>
            </div>
          </div>

          {/* Trust Note */}
          <div className="bg-purple-100 text-purple-700 p-4 rounded-xl text-sm">
            🔒 We respect your privacy. Your information is never shared.
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-10 rounded-2xl shadow-xl space-y-6"
        >
          <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
          <p className="text-gray-500 text-sm mb-4">
            Fill out the form and we’ll get back to you shortly.
          </p>

          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              placeholder="John Doe"
              className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              rows={5}
              placeholder="Tell us how we can help you..."
              className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl font-semibold transition"
          >
            Send Message
          </button>

          <p className="text-xs text-gray-400 text-center">
            Average response time: under 24 hours
          </p>
        </motion.form>

      </section>
    </main>
  );
}
