import { useState } from "react";
import useWallet from "../../hooks/useWallet";

export default function ConnectWallet() {
  const { account, connectWallet } = useWallet();
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    try {
      setLoading(true);

      const address = await connectWallet();

      console.log("✅ Wallet connected from UI:", address);
    } catch (err) {
      console.error("❌ Wallet connection error:", err);
      alert(err.message || "Wallet connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleConnect}
      disabled={loading || !!account}
      className={`px-4 py-2 rounded-lg text-white transition-all duration-200 ${
        account
          ? "bg-green-600 cursor-default"
          : loading
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-indigo-600 hover:bg-indigo-700"
      }`}
    >
      {loading
        ? "Connecting..."
        : account
        ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
        : "Connect Wallet"}
    </button>
  );
}