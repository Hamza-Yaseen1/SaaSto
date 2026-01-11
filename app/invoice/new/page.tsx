"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import { Plus, Trash, MessageCircle, Check, X } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
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

  function generateInvoiceNo() {
    return `INV-${Math.floor(Math.random() * 10000)}`;
  }

  // ---------------- LOGIC ----------------
  const updateItem = (index: number, field: keyof Item, value: string | number) => {
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

  const grandTotal = items.reduce((sum, i) => sum + i.quantity * i.price, 0);

  const resetForm = () => {
    setItems([emptyItem]);
    setCustomerName("");
    setInvoiceNo(generateInvoiceNo());
  };

  // ---------------- PDF ----------------
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

  // ---------------- WHATSAPP ----------------
  const shareWhatsApp = () => {
    const msg = `
Invoice ${invoiceNo}
Customer: ${customerName}

${items
      .filter((i) => i.product)
      .map((i) => `${i.product} | ${i.quantity} x ${i.price} = ${itemTotal(i.quantity, i.price)}`)
      .join("\n")}

Total: ${grandTotal}
    `;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  };

  // ---------------- FIRESTORE ----------------
  const saveInvoice = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to save invoices");
      return;
    }

    if (!customerName || items.length === 0) {
      alert("Please enter customer name and at least one item");
      return;
    }

    setSaving(true);

    try {
      const invoicesRef = collection(db, "users", user.uid, "invoices");

      await addDoc(invoicesRef, {
        invoiceNo,
        customerName,
        items,
        total: grandTotal,
        createdAt: serverTimestamp(),
      });

      setPopup(true); // show stylish popup
    } catch (err) {
      console.error(err);
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

  // ---------------- UI ----------------
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 p-6 md:p-10 relative">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold">Create Invoice</h1>
          <span className="text-gray-500">{invoiceNo}</span>
        </div>

        {/* Invoice Info */}
        <div className="bg-white rounded-2xl shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-600">Customer Name</label>
            <input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Customer name"
              className="mt-1 w-full border rounded-lg px-4 py-2"
            />
          </div>
          <div className="flex items-end">
            <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-semibold">
              Total: {grandTotal}
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="font-semibold text-lg">Invoice Items</h2>
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b pb-4">
              <input
                placeholder="Product"
                value={item.product}
                onChange={(e) => updateItem(index, "product", e.target.value)}
                className="md:col-span-2 border rounded-lg px-3 py-2"
              />
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateItem(index, "quantity", Number(e.target.value))}
                className="border rounded-lg px-3 py-2"
              />
              <input
                type="number"
                min="0"
                value={item.price}
                onChange={(e) => updateItem(index, "price", Number(e.target.value))}
                className="border rounded-lg px-3 py-2"
              />
              <div className="font-semibold">{itemTotal(item.quantity, item.price)}</div>
              <button onClick={() => removeItem(index)} className="text-red-500">
                <Trash size={18} />
              </button>
            </div>
          ))}
          <button onClick={addItem} className="flex items-center gap-2 text-purple-600 font-semibold">
            <Plus size={18} /> Add Item
          </button>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row justify-end gap-4 mt-4">
          <button
            onClick={shareWhatsApp}
            className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl"
          >
            <MessageCircle size={18} /> Share WhatsApp
          </button>

          <button
            onClick={saveInvoice}
            disabled={saving}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-white ${saving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"}`}
          >
            Save Invoice
          </button>
        </div>
      </div>

      {/* ---------------- Stylish Popup ---------------- */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          >
            <motion.div className="bg-white rounded-2xl shadow-xl p-8 w-96 text-center space-y-6">
              <h2 className="text-xl font-bold">Invoice Saved!</h2>
              <p>Do you want to download PDF?</p>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => handlePopupChoice(true)}
                  className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  <Check size={16} /> Yes
                </button>
                <button
                  onClick={() => handlePopupChoice(false)}
                  className="flex items-center gap-2 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  <X size={16} /> No
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
