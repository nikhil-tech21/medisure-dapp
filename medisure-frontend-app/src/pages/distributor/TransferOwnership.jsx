import { useState } from "react";

export default function TransferOwnership() {
  const [batchId, setBatchId] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = () => {
    setMessage("");
    setSuccess(false);

    const normalizedBatchId = batchId.trim();
    if (!normalizedBatchId) {
      setMessage("❌ Please enter a valid Batch ID");
      return;
    }

    setLoading(true);

    const batches = JSON.parse(localStorage.getItem("batches")) || [];

    // 🔒 Strict distributor ownership check
    const index = batches.findIndex(
      (batch) =>
        batch.batchId === normalizedBatchId &&
        batch.owner === "distributor"
    );

    if (index === -1) {
      setLoading(false);
      setMessage("❌ Batch not found or not owned by distributor");
      return;
    }

    // ✅ Transfer to retailer
    const updatedBatches = [...batches];
    updatedBatches[index] = {
      ...updatedBatches[index],
      owner: "retailer",
      status: "Transferred to Retailer",
      transferredAt: new Date().toISOString(),
    };

    localStorage.setItem("batches", JSON.stringify(updatedBatches));

    setSuccess(true);
    setMessage("✅ Batch successfully transferred to Retailer");
    setBatchId("");
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-[#1c1c2b]/90 border border-white/10 rounded-2xl shadow-xl text-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-white">
        Distributor → Retailer Transfer
      </h2>

      <input
        value={batchId}
        onChange={(e) => {
          setBatchId(e.target.value);
          setMessage("");
        }}
        placeholder="Enter Batch ID"
        className="w-full mb-4 p-3 rounded-lg bg-[#0f0f1a] border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 outline-none"
      />

      <button
        onClick={submit}
        disabled={loading}
        className={`w-full py-3 rounded-xl text-white font-semibold transition ${
          loading
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90"
        }`}
      >
        {loading ? "Processing..." : "Transfer to Retailer"}
      </button>

      {message && (
        <p
          className={`mt-4 text-sm text-center font-medium ${
            success ? "text-green-400" : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}