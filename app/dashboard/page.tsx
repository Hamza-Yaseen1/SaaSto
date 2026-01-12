// /app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  CheckCircle,
  XCircle,
  Crown,
  PlusCircle,
  List,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { auth, db } from "@/app/lib/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

type Invoice = {
  id: string;
  paid?: boolean;
};

export default function DashboardPage() {
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [paidInvoices, setPaidInvoices] = useState(0);
  const [unpaidInvoices, setUnpaidInvoices] = useState(0);
  const [canCreateInvoice, setCanCreateInvoice] = useState(false);
  const [planMessage, setPlanMessage] = useState("Checking plan...");

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      // 🔹 Get invoices
      const invoicesRef = collection(db, "users", user.uid, "invoices");
      const snapshot = await getDocs(invoicesRef);

      const invoices = snapshot.docs.map(doc => doc.data()) as Invoice[];

      setTotalInvoices(invoices.length);
      setPaidInvoices(invoices.filter(i => i.paid).length);
      setUnpaidInvoices(invoices.filter(i => !i.paid).length);

      // 🔹 Check plan
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) return;

      const data = userSnap.data();
      const now = new Date();

      const trialEndsAt = data.trialEndsAt?.toDate();
      const subscriptionEndsAt = data.subscriptionEndsAt?.toDate();

      if (subscriptionEndsAt && subscriptionEndsAt > now) {
        setCanCreateInvoice(true);
        setPlanMessage("Premium Active 👑");
      } else if (trialEndsAt && trialEndsAt > now) {
        setCanCreateInvoice(true);
        setPlanMessage("Trial Active ⏳");
      } else {
        setCanCreateInvoice(false);
        setPlanMessage("Plan expired ❌ Upgrade required");
      }
    };

    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="flex gap-4">
          <Link href={canCreateInvoice ? "/invoice/new" : "#"}>
            <motion.button
              whileHover={{ scale: canCreateInvoice ? 1.05 : 1 }}
              disabled={!canCreateInvoice}
              className={`px-5 py-3 rounded-xl flex items-center gap-2
                ${canCreateInvoice
                  ? "bg-purple-600 text-white"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card icon={<FileText />} title="Total" value={totalInvoices} />
        <Card icon={<CheckCircle />} title="Paid" value={paidInvoices} />
        <Card icon={<XCircle />} title="Unpaid" value={unpaidInvoices} />

        <div className="bg-purple-600 text-white p-6 rounded-xl">
          <Crown />
          <p className="mt-2 font-bold">{planMessage}</p>
        </div>
      </div>
    </main>
  );
}

function Card({ icon, title, value }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      {icon}
      <p className="text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
