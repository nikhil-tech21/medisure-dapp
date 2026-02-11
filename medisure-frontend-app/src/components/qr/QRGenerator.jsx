import React from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRGenerator({ value }) {
  return (
    <div className="mt-6 flex flex-col items-center gap-3">
      <p className="text-sm text-gray-400">Generated QR Code</p>
      <div className="bg-white p-3 rounded-lg">
        <QRCodeCanvas value={value} size={180} />
      </div>
    </div>
  );
}