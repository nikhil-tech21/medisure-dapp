import { useState } from "react";
import QRScanner from "../../components/qr/QRScanner";
import formatDate from "../../utils/formatDate";

export default function VerifyMedicine() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ FRONTEND-ONLY VERIFICATION USING localStorage
  const handleScan = (rawBatchId) => {
    if (loading || data) return; // 🔒 prevent duplicate scans

    const batchId = rawBatchId?.trim();
    if (!batchId) return;

    setLoading(true);
    setError("");
    setData(null);

    // simulate blockchain/network delay
    setTimeout(() => {
      const batches = JSON.parse(localStorage.getItem("batches")) || [];

      const found = batches.find(
        (batch) =>
          batch.batchId === batchId &&
          batch.owner === "retailer"
      );

      if (!found) {
        setError("❌ Medicine not verified or invalid batch");
        setLoading(false);
        return;
      }

      setData(found);
      setLoading(false);
    }, 800);
  };

  // 🔁 Reset for rescan
  const resetScan = () => {
    setData(null);
    setError("");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0b0b12] text-white p-8 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-purple-400">
        Verify Medicine
      </h2>

      {/* QR Scanner */}
      {!data && !loading && (
        <div className="w-full max-w-md">
          <QRScanner onScan={handleScan} />
        </div>
      )}

      {/* Loading */}
      {loading && (
        <p className="mt-4 text-gray-400 animate-pulse">
          Verifying medicine on blockchain...
        </p>
      )}

      {/* Error */}
      {error && !loading && (
        <>
          <p className="mt-4 text-red-400 font-medium">
            {error}
          </p>
          <button
            onClick={resetScan}
            className="mt-4 px-4 py-2 bg-purple-600 rounded-lg hover:opacity-90"
          >
            Scan Again
          </button>
        </>
      )}

      {/* Verification Result */}
      {data && !loading && (
        <div className="mt-6 w-full max-w-md bg-[#1c1c2b] p-6 rounded-xl border border-green-500/30 shadow-lg">
          <h3 className="text-xl font-semibold text-green-400 mb-3">
            ✔ Medicine Verified
          </h3>

          <p><strong>Batch ID:</strong> {data.batchId}</p>
          <p><strong>Medicine:</strong> {data.name}</p>
          <p><strong>Manufactured:</strong> {formatDate(data.mfgDate)}</p>
          <p><strong>Expiry:</strong> {formatDate(data.expDate)}</p>
          <p><strong>Current Owner:</strong> Retailer</p>

          <p className="mt-2 text-green-400 font-semibold">
            Status: {data.status}
          </p>

          <button
            onClick={resetScan}
            className="mt-4 w-full bg-purple-600 py-2 rounded-lg hover:opacity-90"
          >
            Scan Another Medicine
          </button>
        </div>
      )}
    </div>
  );
}