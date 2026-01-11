// /app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { FileText, CheckCircle, XCircle, Crown, PlusCircle, List } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { auth, db } from "@/app/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

type Invoice = {
  id: string;
  total: number;
  paid?: boolean;
};

export default function DashboardPage() {
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [paidInvoices, setPaidInvoices] = useState(0);
  const [unpaidInvoices, setUnpaidInvoices] = useState(0);

  useEffect(() => {
    const fetchInvoices = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const invoicesRef = collection(db, "users", user.uid, "invoices");
        const snapshot = await getDocs(invoicesRef);

        const invoices: Invoice[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Invoice[];

        setTotalInvoices(invoices.length);
        setPaidInvoices(invoices.filter(inv => inv.paid).length);
        setUnpaidInvoices(invoices.filter(inv => !inv.paid).length);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      
      {/* Page Title */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-500">
            Overview of your invoices and plan status
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <Link href="/invoice/new">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-purple-600 text-white px-5 py-3 rounded-xl shadow-md"
            >
              <PlusCircle size={18} /> Create New Invoice
            </motion.button>
          </Link>

          <Link href="/invoice/list">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-green-500 text-white px-5 py-3 rounded-xl shadow-md"
            >
              <List size={18} /> View My Invoices
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Invoices */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-xl p-6 shadow-sm border"
        >
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <FileText className="text-purple-600" />
            </div>
            <div>
              <h2 className="text-gray-500 text-sm">Total Invoices</h2>
              <p className="text-2xl font-bold">{totalInvoices}</p>
            </div>
          </div>
        </motion.div>

        {/* Paid */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-xl p-6 shadow-sm border"
        >
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="text-green-600" />
            </div>
            <div>
              <h2 className="text-gray-500 text-sm">Paid</h2>
              <p className="text-2xl font-bold">{paidInvoices}</p>
            </div>
          </div>
        </motion.div>

        {/* Unpaid */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-xl p-6 shadow-sm border"
        >
          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <XCircle className="text-red-600" />
            </div>
            <div>
              <h2 className="text-gray-500 text-sm">Unpaid</h2>
              <p className="text-2xl font-bold">{unpaidInvoices}</p>
            </div>
          </div>
        </motion.div>

        {/* Plan Status */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <Crown />
            </div>
            <div>
              <h2 className="text-sm opacity-90">Plan Status</h2>
              <p className="text-xl font-bold">Premium</p>
              <p className="text-xs opacity-80">Valid till 30 Mar 2026</p>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
