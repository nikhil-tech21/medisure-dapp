import React, { useState } from "react";
import formatDate from "../../utils/formatDate";

export default function VerifyBatch() {
  const [batchId, setBatchId] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const verify = () => {
    setError("");
    setData(null);

    const normalizedBatchId = batchId.trim();
    if (!normalizedBatchId) {
      setError("❌ Please enter a Batch ID");
      return;
    }

    const batches = JSON.parse(localStorage.getItem("batches")) || [];

    const found = batches.find(
      (batch) =>
        batch.batchId === normalizedBatchId &&
        batch.owner === "retailer" // ✅ AUTO VERIFY ON OWNERSHIP
    );

    if (!found) {
      setError("❌ Batch not found or not yet transferred to retailer");
      return;
    }

    setData(found);
  };

  return (
    <div className="p-8 max-w-xl mx-auto text-gray-100">
      <h2 className="text-2xl font-semibold mb-6">
        Verify Medicine Batch
      </h2>

      <input
        value={batchId}
        onChange={(e) => setBatchId(e.target.value)}
        placeholder="Enter Batch ID"
        className="w-full p-3 mb-4 bg-[#1c1c2b] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <button
        onClick={verify}
        className="bg-gradient-to-r from-blue-500 to-cyan-600 px-6 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition"
      >
        Verify Batch
      </button>

      {error && (
        <p className="mt-4 text-red-400 text-sm font-medium">
          {error}
        </p>
      )}

      {data && (
        <div className="mt-6 bg-[#161622] p-4 rounded-lg text-sm text-gray-300 space-y-1">
          <p><b>Batch ID:</b> {data.batchId}</p>
          <p><b>Medicine:</b> {data.name}</p>
          <p><b>Manufactured:</b> {formatDate(data.mfgDate)}</p>
          <p><b>Expiry:</b> {formatDate(data.expDate)}</p>
          <p><b>Current Owner:</b> Retailer</p>

          {/* ✅ AUTO VERIFIED POPUP */}
          <p className="text-green-400 mt-2 font-semibold text-lg">
            ✅ Verified (Ownership Confirmed)
          </p>

          {data.status === "Verified & Ready for Sale" && (
            <p className="text-green-300 text-sm">
              ✔ Final Retailer Verification Completed
            </p>
          )}
        </div>
      )}
    </div>
  );
}