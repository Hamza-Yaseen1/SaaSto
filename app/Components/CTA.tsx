"use client";

export default function CTA() {
  return (
    <section className="max-w-4xl mx-auto text-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-16 rounded-3xl shadow-2xl mb-24">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Simplify Your Business?</h2>
      <p className="text-purple-100 mb-8">Start using SaaSto today. Free trial, no credit card required.</p>
      <a href="/register" className="inline-block bg-white text-purple-600 px-10 py-4 rounded-xl font-semibold hover:bg-purple-100 transition">
        Get Started Free
      </a>
    </section>
  );
}
