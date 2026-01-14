"use client";

import { useState } from "react";
import { Plus, Trash, MessageCircle, Check, X, Eye } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/app/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import { PDFDesign } from "@/app/Components/PDFDesign";

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
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewDataUrl, setPreviewDataUrl] = useState("");

  function generateInvoiceNo() {
    return `INV-${Math.floor(1000 + Math.random() * 9000)}`;
  }

  const grandTotal = items.reduce((sum, i) => sum + i.quantity * i.price, 0);
  const itemTotal = (q: number, p: number) => q * p;

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

  const resetForm = () => {
    setItems([emptyItem]);
    setCustomerName("");
    setInvoiceNo(generateInvoiceNo());
  };

  const saveInvoice = async () => {
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
    } catch {
      alert("Error saving invoice");
    } finally {
      setSaving(false);
    }
  };

  // ================= PDF Preview =================
  const handlePreview = () => {
    const { createPDF } = PDFDesign({ invoiceNo, customerName, items });
    const doc = createPDF();
    const dataUrl = doc.output("datauristring"); // Get PDF as data URL
    setPreviewDataUrl(dataUrl);
    setPreviewOpen(true);
  };

  const handlePopupChoice = (download: boolean) => {
    const { createPDF } = PDFDesign({ invoiceNo, customerName, items });
    if (download) createPDF().save(`${invoiceNo}.pdf`);
    resetForm();
    setPopup(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Create Invoice</h1>
          <span className="text-gray-500">{invoiceNo}</span>
        </div>

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
                onChange={(e) => updateItem(index, "product", e.target.value)}
              />
              <input
                type="number"
                className="border rounded p-2"
                value={item.quantity}
                onChange={(e) => updateItem(index, "quantity", Number(e.target.value))}
              />
              <input
                type="number"
                className="border rounded p-2"
                value={item.price}
                onChange={(e) => updateItem(index, "price", Number(e.target.value))}
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
            onClick={() => {
              const msg = `Invoice ${invoiceNo}\nCustomer: ${customerName}\n\n${items
                .filter((i) => i.product)
                .map(
                  (i) => `${i.product} | ${i.quantity} x ${i.price} = ${itemTotal(i.quantity, i.price)}`
                )
                .join("\n")}\n\nTotal: ${grandTotal}`;
              window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
            }}
            className="bg-green-500 text-white px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <MessageCircle size={18} /> Share
          </button>

          <button
            onClick={handlePreview}
            className="bg-yellow-500 text-white px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <Eye size={18} /> Preview
          </button>

          <button
            disabled={saving}
            onClick={saveInvoice}
            className="px-6 py-3 rounded-xl text-white bg-blue-600"
          >
            Save Invoice
          </button>
        </div>
      </div>

      {/* POPUP AFTER SAVE */}
      <AnimatePresence>
        {popup && (
          <motion.div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl space-y-4 text-center">
              <h2 className="text-xl font-bold">Invoice Saved</h2>
              <p>Download PDF?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => handlePopupChoice(true)}
                  className="bg-purple-600 text-white px-4 py-2 rounded flex items-center gap-1"
                >
                  <Check size={16} /> Yes
                </button>
                <button
                  onClick={() => handlePopupChoice(false)}
                  className="bg-gray-300 px-4 py-2 rounded flex items-center gap-1"
                >
                  <X size={16} /> No
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PDF Preview POPUP */}
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl w-full max-w-4xl h-full md:h-[80%] overflow-hidden flex flex-col"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              {/* Header */}
              <div className="flex justify-between items-center bg-gray-100 p-4 border-b">
                <h2 className="text-lg font-bold">Invoice Preview</h2>
                <button
                  className="text-red-500"
                  onClick={() => setPreviewOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>

              {/* PDF preview */}
              <iframe
                src={previewDataUrl}
                className="flex-1 w-full border-0"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
