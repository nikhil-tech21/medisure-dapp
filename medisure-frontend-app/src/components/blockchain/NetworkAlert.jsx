import React, { useEffect, useState } from "react";

export default function NetworkAlert() {
  const [networkOk, setNetworkOk] = useState(true);

  useEffect(() => {
    const checkNetwork = async () => {
      if (!window.ethereum) return;
      const chainId = await window.ethereum.request({ method: "eth_chainId" });

      // Ganache default chainId = 0x539 (1337)
      setNetworkOk(chainId === "0x539");
    };

    checkNetwork();
    window.ethereum?.on("chainChanged", checkNetwork);
  }, []);

  if (networkOk) return null;

  return (
    <div className="bg-red-600 text-white text-center py-2 text-sm">
      ⚠️ Please switch to Ganache Local Network (Chain ID: 1337)
    </div>
  );
}