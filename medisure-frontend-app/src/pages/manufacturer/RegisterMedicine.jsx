import { useState } from "react";
import QRGenerator from "../../components/qr/QRGenerator";

export default function RegisterMedicine() {
  const [form, setForm] = useState({
    batchId: "",
    name: "",
    mfgDate: "",
    expDate: "",
  });

  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // 🔍 Get existing batches
    const existingBatches =
      JSON.parse(localStorage.getItem("batches")) || [];

    // ❌ Prevent duplicate Batch IDs
    const alreadyExists = existingBatches.find(
      (b) => b.batchId === form.batchId
    );

    if (alreadyExists) {
      setError("❌ Batch ID already exists");
      return;
    }

    // ✅ Create batch object (frontend demo)
    const newBatch = {
      batchId: form.batchId,
      name: form.name,
      mfgDate: form.mfgDate,
      expDate: form.expDate,
      owner: "manufacturer",
      status: "Created",
      createdAt: new Date().toISOString(),
    };

    // ✅ Save to localStorage
    localStorage.setItem(
      "batches",
      JSON.stringify([...existingBatches, newBatch])
    );

    setRegistered(true);
  };

  return (
    <div className="max-w-xl mx-auto p-8 text-gray-100">
      {/* Title */}
      <h2 className="text-3xl font-bold mb-6 text-white">
        Register Medicine Batch
      </h2>

      {/* Error */}
      {error && (
        <p className="mb-4 text-red-400 font-medium">{error}</p>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Batch ID"
          value={form.batchId}
          onChange={(e) =>
            setForm({ ...form, batchId: e.target.value })
          }
          className="w-full p-3 rounded-lg bg-[#1c1c2b] border border-gray-600 text-white"
          required
        />

        <input
          placeholder="Medicine Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="w-full p-3 rounded-lg bg-[#1c1c2b] border border-gray-600 text-white"
          required
        />

        <input
          type="date"
          value={form.mfgDate}
          onChange={(e) =>
            setForm({ ...form, mfgDate: e.target.value })
          }
          className="w-full p-3 rounded-lg bg-[#1c1c2b] border border-gray-600 text-white"
          required
        />

        <input
          type="date"
          value={form.expDate}
          onChange={(e) =>
            setForm({ ...form, expDate: e.target.value })
          }
          className="w-full p-3 rounded-lg bg-[#1c1c2b] border border-gray-600 text-white"
          required
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 py-3 rounded-xl text-white font-semibold hover:opacity-90 transition"
        >
          Register Batch
        </button>
      </form>

      {/* QR Code */}
      {registered && (
        <div className="mt-8 text-center">
          <p className="text-green-400 mb-4">
            ✅ Batch registered successfully
          </p>
          <QRGenerator value={form.batchId} />
        </div>
      )}
    </div>
  );
}