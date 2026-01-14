"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  CheckCircle,
  XCircle,
  PlusCircle,
  List,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { auth, db } from "@/app/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

type Invoice = {
  id: string;
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

      const invoicesRef = collection(db, "users", user.uid, "invoices");
      const snapshot = await getDocs(invoicesRef);

      const invoices = snapshot.docs.map(
        (doc) => doc.data() as Invoice
      );

      setTotalInvoices(invoices.length);
      setPaidInvoices(invoices.filter((i) => i.paid).length);
      setUnpaidInvoices(invoices.filter((i) => !i.paid).length);
    };

    fetchInvoices();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="flex gap-4">
          <Link href="/invoice/new">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-5 py-3 rounded-xl bg-purple-600 text-white flex items-center gap-2"
            >
              <PlusCircle size={18} />
              New Invoice
            </motion.button>
          </Link>

          <Link href="/invoice/list">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-5 py-3 rounded-xl bg-green-500 text-white flex items-center gap-2"
            >
              <List size={18} />
              Invoice List
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={<FileText />}
          title="Total Invoices"
          value={totalInvoices}
        />
        <StatCard
          icon={<CheckCircle />}
          title="Paid Invoices"
          value={paidInvoices}
        />
        <StatCard
          icon={<XCircle />}
          title="Unpaid Invoices"
          value={unpaidInvoices}
        />
      </div>

      {/* Ad Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-xl font-bold">📢 Sponsored</h2>
        <p className="mt-2 text-sm">
          Promote your business here.  
          Contact us to place your ad 🚀
        </p>
      </motion.div>
    </main>
  );
}

/* ---------------- Components ---------------- */

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: number;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white p-6 rounded-xl shadow flex flex-col gap-2"
    >
      <div className="text-purple-600">{icon}</div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </motion.div>
  );
}
