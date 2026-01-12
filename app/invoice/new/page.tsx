"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { Plus, Trash, MessageCircle, Check, X, Lock } from "lucide-react";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "@/app/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";

type Item = {
  product: string;
  quantity: number;
  price: number;
};

const emptyItem: Item = { product: "", quantity: 1, price: 0 };

export default function NewInvoicePage() {
  const [items, setItems] = useState<Item[]>([emptyItem]);
  const [customerName, setCustomerName] = useState("");
  const [invoiceNo, setInvoiceNo] = useState(generateInvoiceNo());
  const [saving, setSaving] = useState(false);
  const [popup, setPopup] = useState(false);
  const [canCreateInvoice, setCanCreateInvoice] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);

  function generateInvoiceNo() {
    return `INV-${Math.floor(1000 + Math.random() * 9000)}`;
  }

  // ================= CHECK TRIAL / SUBSCRIPTION =================
  useEffect(() => {
    const checkAccess = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        setCanCreateInvoice(false);
        setCheckingAccess(false);
        return;
      }

      const data = snap.data();
      const now = new Date();

      const trialEndsAt = data.trialEndsAt?.toDate?.();
      const subscriptionEndsAt = data.subscriptionEndsAt?.toDate?.();

      const trialValid = trialEndsAt && trialEndsAt > now;
      const subscriptionValid =
        subscriptionEndsAt && subscriptionEndsAt > now;

      setCanCreateInvoice(!!(trialValid || subscriptionValid));
      setCheckingAccess(false);
    };

    checkAccess();
  }, []);

  // ================= ITEMS LOGIC =================
  const updateItem = (index: number, field: keyof Item, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const addItem = () => setItems([...items, emptyItem]);

  const removeItem = (index: number) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const itemTotal = (q: number, p: number) => q * p;
  const grandTotal = items.reduce(
    (sum, i) => sum + i.quantity * i.price,
    0
  );

  const resetForm = () => {
    setItems([emptyItem]);
    setCustomerName("");
    setInvoiceNo(generateInvoiceNo());
  };

  // ================= PDF =================
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("INVOICE", 14, 20);
    doc.setFontSize(12);
    doc.text(`Invoice No: ${invoiceNo}`, 14, 30);
    doc.text(`Customer: ${customerName || "N/A"}`, 14, 38);

    doc.text("Product", 14, 55);
    doc.text("Qty", 90, 55);
    doc.text("Price", 120, 55);
    doc.text("Total", 160, 55);

    let y = 65;
    items.forEach((item) => {
      if (!item.product) return;
      doc.text(item.product, 14, y);
      doc.text(String(item.quantity), 90, y);
      doc.text(String(item.price), 120, y);
      doc.text(String(itemTotal(item.quantity, item.price)), 160, y);
      y += 10;
    });

    doc.text(`Grand Total: ${grandTotal}`, 14, y + 10);
    doc.save(`${invoiceNo}.pdf`);
  };

  // ================= WHATSAPP =================
  const shareWhatsApp = () => {
    const msg = `
Invoice ${invoiceNo}
Customer: ${customerName}

${items
      .filter((i) => i.product)
      .map(
        (i) =>
          `${i.product} | ${i.quantity} x ${i.price} = ${itemTotal(
            i.quantity,
            i.price
          )}`
      )
      .join("\n")}

Total: ${grandTotal}
    `;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  // ================= SAVE TO FIRESTORE =================
  const saveInvoice = async () => {
    if (!canCreateInvoice) return;

    const user = auth.currentUser;
    if (!user) {
      alert("Please login first");
      return;
    }

    if (!customerName || grandTotal === 0) {
      alert("Please add customer & items");
      return;
    }

    setSaving(true);

    try {
      await addDoc(collection(db, "users", user.uid, "invoices"), {
        invoiceNo,
        customerName,
        items,
        total: grandTotal,
        createdAt: serverTimestamp(),
      });

      setPopup(true);
    } catch (err) {
      alert("Error saving invoice");
    } finally {
      setSaving(false);
    }
  };

  const handlePopupChoice = (download: boolean) => {
    if (download) generatePDF();
    resetForm();
    setPopup(false);
  };

  // ================= UI =================
  if (checkingAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking access...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-8">
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Create Invoice</h1>
          <span className="text-gray-500">{invoiceNo}</span>
        </div>

        {!canCreateInvoice && (
          <div className="bg-red-100 text-red-700 p-4 rounded-xl flex gap-2 items-center">
            <Lock size={18} />
            Trial expired. Please upgrade to continue.
          </div>
        )}

        {/* Customer */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <input
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Customer name"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* Items */}
        <div className="bg-white p-6 rounded-2xl shadow space-y-4">
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-6 gap-3 items-center">
              <input
                className="col-span-2 border rounded p-2"
                placeholder="Product"
                value={item.product}
                onChange={(e) =>
                  updateItem(index, "product", e.target.value)
                }
              />
              <input
                type="number"
                className="border rounded p-2"
                value={item.quantity}
                onChange={(e) =>
                  updateItem(index, "quantity", Number(e.target.value))
                }
              />
              <input
                type="number"
                className="border rounded p-2"
                value={item.price}
                onChange={(e) =>
                  updateItem(index, "price", Number(e.target.value))
                }
              />
              <div>{itemTotal(item.quantity, item.price)}</div>
              <button onClick={() => removeItem(index)}>
                <Trash size={18} />
              </button>
            </div>
          ))}

          <button onClick={addItem} className="text-purple-600 flex gap-2">
            <Plus size={18} /> Add Item
          </button>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button
            onClick={shareWhatsApp}
            className="bg-green-500 text-white px-6 py-3 rounded-xl"
          >
            <MessageCircle size={18} />
          </button>

          <button
            disabled={!canCreateInvoice || saving}
            onClick={saveInvoice}
            className={`px-6 py-3 rounded-xl text-white ${
              canCreateInvoice
                ? "bg-blue-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Save Invoice
          </button>
        </div>
      </div>

      {/* POPUP */}
      <AnimatePresence>
        {popup && (
          <motion.div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl space-y-4 text-center">
              <h2 className="text-xl font-bold">Invoice Saved</h2>
              <p>Download PDF?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => handlePopupChoice(true)}
                  className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => handlePopupChoice(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
