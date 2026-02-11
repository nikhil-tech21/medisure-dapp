import { useState } from "react";

export default function ReceiveBatch() {
  const [batchId, setBatchId] = useState("");
  const [message, setMessage] = useState("");

  const receiveBatch = () => {
    const batches = JSON.parse(localStorage.getItem("batches")) || [];

    const exists = batches.some(
      (b) => b.batchId === batchId && b.owner === "manufacturer"
    );

    if (!exists) {
      setMessage("❌ Invalid Batch ID or already received");
      return;
    }

    const updated = batches.map((b) =>
      b.batchId === batchId
        ? { ...b, owner: "distributor", status: "Received by Distributor" }
        : b
    );

    localStorage.setItem("batches", JSON.stringify(updated));
    setMessage("✅ Batch successfully received by Distributor");
    setBatchId("");
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-[#1c1c2b]/90 border border-white/10 rounded-2xl text-white">
      <h2 className="text-2xl font-bold mb-6">Receive Batch</h2>

      <input
        value={batchId}
        onChange={(e) => setBatchId(e.target.value)}
        placeholder="Enter Batch ID"
        className="w-full p-3 mb-4 rounded-lg bg-[#0f0f1a] border border-gray-600"
      />

      <button
        onClick={receiveBatch}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 py-3 rounded-xl font-semibold"
      >
        Receive from Manufacturer
      </button>

      {message && (
        <p className="mt-4 text-center text-sm">{message}</p>
      )}
    </div>
  );
}