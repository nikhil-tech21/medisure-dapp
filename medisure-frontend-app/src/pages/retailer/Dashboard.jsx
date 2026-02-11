import React, { useEffect, useState } from "react";
import { FaClipboardList, FaBarcode } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function RetailerDashboard() {
  const [batches, setBatches] = useState([]);
  const navigate = useNavigate();

  // 🔁 Always sync from localStorage
  const loadBatches = () => {
    const stored = JSON.parse(localStorage.getItem("batches")) || [];
    setBatches(stored);
  };

  useEffect(() => {
    loadBatches();
  }, []);

  // ✅ Retailer verification (FINAL step before consumer)
  const verifyBatch = (batchId) => {
    const updated = batches.map((batch) =>
      batch.batchId === batchId &&
      batch.owner === "retailer" &&
      batch.status !== "Verified & Ready for Sale"
        ? {
            ...batch,
            status: "Verified & Ready for Sale",
            verifiedAt: new Date().toISOString(),
          }
        : batch
    );

    localStorage.setItem("batches", JSON.stringify(updated));
    setBatches(updated); // sync UI
  };

  // Only batches that distributor transferred
  const retailerBatches = batches.filter(
    (batch) => batch.owner === "retailer"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0b12] via-[#111130] to-[#0b0b12] text-gray-100 p-8 md:p-14 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Retailer Dashboard
        </h1>
        <p className="text-gray-400 mt-3 text-lg">
          Verify distributor-transferred medicines before selling to consumers.
        </p>
      </div>

      {/* ================= RECEIVED BATCHES ================= */}
      <div className="max-w-6xl mx-auto bg-[#161622]/80 border border-white/10 p-8 rounded-2xl shadow-xl mb-14">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <FaClipboardList className="text-blue-400" />
          Batches Received from Distributor
        </h2>

        {retailerBatches.length === 0 ? (
          <p className="text-gray-400 text-center">
            No batches received from distributor yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
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
                {retailerBatches.map((batch) => (
                  <tr
                    key={batch.batchId}
                    className="bg-[#1c1c2b]/60 rounded-xl"
                  >
                    <td className="px-4 py-3 text-white font-medium">
                      {batch.batchId}
                    </td>
                    <td className="px-4 py-3">{batch.name}</td>
                    <td className="px-4 py-3 text-yellow-400">
                      {batch.status}
                    </td>
                    <td className="px-4 py-3">
                      {batch.status !== "Verified & Ready for Sale" ? (
                        <button
                          onClick={() => verifyBatch(batch.batchId)}
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition"
                        >
                          Verify Batch
                        </button>
                      ) : (
                        <span className="text-green-400 font-semibold">
                          ✔ Verified
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================= CONSUMER VERIFICATION ================= */}
      <div className="max-w-6xl mx-auto text-center bg-[#1c1c2b]/90 border border-white/10 p-10 rounded-3xl shadow-[0_0_50px_rgba(59,130,246,0.3)]">
        <FaBarcode className="text-5xl mx-auto text-blue-400 mb-4" />
        <h3 className="text-2xl font-semibold text-white mb-2">
          Consumer Verification
        </h3>
        <p className="text-gray-400 text-base max-w-2xl mx-auto mb-6">
          Only retailer-verified medicines can be scanned by consumers.
        </p>
        <button
          onClick={() => navigate("/consumer/scan")}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-600 px-8 py-3 rounded-xl text-white font-medium shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all duration-300"
        >
          Go to Consumer Scan
        </button>
      </div>
    </div>
  );
}