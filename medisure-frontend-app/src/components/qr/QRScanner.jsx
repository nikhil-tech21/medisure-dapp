import React, { useRef } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

export default function QRScanner({ onScan }) {
  const hasScannedRef = useRef(false); // 🔒 HARD LOCK

  return (
    <div className="w-full max-w-sm mx-auto rounded-xl overflow-hidden border border-white/10 shadow-lg bg-black">
      <Scanner
        constraints={{ facingMode: "environment" }}
        onScan={(result) => {
          if (hasScannedRef.current) return; // ⛔ stop repeat scans

          if (result?.length > 0) {
            const scannedValue = result[0].rawValue?.trim();
            if (!scannedValue) return;

            hasScannedRef.current = true; // 🔐 lock immediately
            console.log("✅ QR Scanned:", scannedValue);

            onScan?.(scannedValue);
          }
        }}
        onError={(error) => {
          // Camera / permission errors only
          console.error("QR Scanner Error:", error);
        }}
      />
    </div>
  );
}