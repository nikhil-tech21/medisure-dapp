import React, { useEffect, useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";

export default function DistributorDashboard() {
  const [batches, setBatches] = useState([]);

  // Load batches
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("batches")) || [];
    setBatches(stored);
  }, []);

  // Accept batch from manufacturer
  const acceptBatch = (batchId) => {
    const updated = batches.map((batch) =>
      batch.batchId === batchId && batch.owner === "manufacturer"
        ? {
            ...batch,
            owner: "distributor",
            status: "Received by Distributor",
          }
        : batch
    );

    localStorage.setItem("batches", JSON.stringify(updated));
    setBatches(updated);
  };

  // 🔑 Transfer batch to retailer (CRITICAL FIX)
  const transferToRetailer = (batchId) => {
    const updated = batches.map((batch) =>
      batch.batchId === batchId && batch.owner === "distributor"
        ? {
            ...batch,
            owner: "retailer",
            status: "Transferred to Retailer",
            transferredAt: new Date().toISOString(),
          }
        : batch
    );

    localStorage.setItem("batches", JSON.stringify(updated));
    setBatches(updated);
  };

  const manufacturerBatches = batches.filter(
    (b) => b.owner === "manufacturer"
  );

  const distributorBatches = batches.filter(
    (b) => b.owner === "distributor"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0b12] via-[#12122a] to-[#0b0b12] text-gray-100 p-8 md:p-14">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          Distributor Dashboard
        </h1>
        <p className="text-gray-400 mt-3 text-lg">
          Receive and forward medicine batches securely.
        </p>
      </div>

      {/* ================= Manufacturer Batches ================= */}
      <div className="max-w-6xl mx-auto bg-[#161622]/80 border border-white/10 p-8 rounded-2xl shadow-xl mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <FaExchangeAlt className="text-green-400" />
          Pending Manufacturer Batches
        </h2>

        {manufacturerBatches.length === 0 ? (
          <p className="text-gray-400 text-center">
            No batches awaiting acceptance.
          </p>
        ) : (
          <table className="min-w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-gray-400 text-sm">
                <th className="px-4 py-2 text-left">Batch ID</th>
                <th className="px-4 py-2 text-left">Medicine</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {manufacturerBatches.map((batch) => (
                <tr key={batch.batchId} className="bg-[#1c1c2b]/60">
                  <td className="px-4 py-3 font-medium text-white">
                    {batch.batchId}
                  </td>
                  <td className="px-4 py-3">{batch.name}</td>
                  <td className="px-4 py-3 text-yellow-400">
                    Awaiting Pickup
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => acceptBatch(batch.batchId)}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-lg text-white text-sm font-semibold"
                    >
                      Accept Batch
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ================= Distributor Batches ================= */}
      <div className="max-w-6xl mx-auto bg-[#161622]/80 border border-white/10 p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6">
          Batches With Distributor
        </h2>

        {distributorBatches.length === 0 ? (
          <p className="text-gray-400 text-center">
            No batches ready to transfer.
          </p>
        ) : (
          <table className="min-w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-gray-400 text-sm">
                <th className="px-4 py-2 text-left">Batch ID</th>
                <th className="px-4 py-2 text-left">Medicine</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {distributorBatches.map((batch) => (
                <tr key={batch.batchId} className="bg-[#1c1c2b]/60">
                  <td className="px-4 py-3 font-medium text-white">
                    {batch.batchId}
                  </td>
                  <td className="px-4 py-3">{batch.name}</td>
                  <td className="px-4 py-3 text-blue-400">
                    {batch.status}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => transferToRetailer(batch.batchId)}
                      className="bg-gradient-to-r from-blue-500 to-cyan-600 px-4 py-2 rounded-lg text-white text-sm font-semibold"
                    >
                      Send to Retailer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}