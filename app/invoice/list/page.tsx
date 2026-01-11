"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/app/lib/firebase";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";

type Item = {
  product: string;
  quantity: number;
  price: number;
};

type Invoice = {
  id: string;
  invoiceNo: string;
  customerName: string;
  items: Item[];
  total: number;
  createdAt: any;
};

export default function InvoiceListPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      const user = auth.currentUser;
      if (!user) {
        setInvoices([]);
        setLoading(false);
        return;
      }

      try {
        const invoicesRef = collection(db, "users", user.uid, "invoices");
        const q = query(invoicesRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        // Replace state to prevent duplicates
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Invoice[];

        setInvoices(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  if (loading)
    return <p className="p-6 text-center text-gray-500">Loading invoices...</p>;

  return (
    <main className="min-h-screen bg-purple-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">My Invoices</h1>

        {invoices.length === 0 && (
          <p className="text-gray-600">No invoices found.</p>
        )}

        <AnimatePresence>
          {invoices.map((inv) => (
            <motion.div
              key={inv.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border"
            >
              {/* Invoice Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                <span className="font-bold text-lg">{inv.invoiceNo}</span>
                <span className="text-gray-500 text-sm">
                  {inv.createdAt?.toDate?.().toLocaleString() || "N/A"}
                </span>
              </div>

              {/* Customer & Total */}
              <div className="flex flex-col md:flex-row justify-between gap-2 mb-4">
                <div className="bg-purple-50 px-4 py-2 rounded-lg font-medium text-purple-700">
                  Customer: {inv.customerName || "N/A"}
                </div>
                <div className="bg-green-50 px-4 py-2 rounded-lg font-medium text-green-700">
                  Total: {inv.total}
                </div>
              </div>

              {/* Items Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-sm font-medium text-gray-600 border-b">
                        Product
                      </th>
                      <th className="px-3 py-2 text-sm font-medium text-gray-600 border-b">
                        Quantity
                      </th>
                      <th className="px-3 py-2 text-sm font-medium text-gray-600 border-b">
                        Price
                      </th>
                      <th className="px-3 py-2 text-sm font-medium text-gray-600 border-b">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {inv.items.map((item, i) => (
                      <tr
                        key={i}
                        className="hover:bg-purple-50 transition-colors"
                      >
                        <td className="px-3 py-2 border-b">{item.product}</td>
                        <td className="px-3 py-2 border-b text-center">
                          {item.quantity}
                        </td>
                        <td className="px-3 py-2 border-b text-right">
                          {item.price}
                        </td>
                        <td className="px-3 py-2 border-b text-right">
                          {item.quantity * item.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
}
