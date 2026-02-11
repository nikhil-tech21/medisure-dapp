import { useEffect, useState } from "react";

const REQUIRED_CHAIN_ID = "0x539"; // 1337

export default function useWallet() {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);

  useEffect(() => {
    if (!window.ethereum) return;

    // Initial load
    window.ethereum.request({ method: "eth_accounts" })
      .then(accounts => {
        if (accounts.length) setAccount(accounts[0]);
      });

    window.ethereum.request({ method: "eth_chainId" })
      .then(id => setChainId(id));

    // Listeners (VERY IMPORTANT)
    window.ethereum.on("accountsChanged", accounts => {
      setAccount(accounts.length ? accounts[0] : null);
    });

    window.ethereum.on("chainChanged", id => {
      setChainId(id);
      window.location.reload(); // safest
    });

    return () => {
      window.ethereum.removeAllListeners();
    };
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      throw new Error("MetaMask not installed");
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    const currentChain = await window.ethereum.request({
      method: "eth_chainId"
    });

    if (currentChain !== REQUIRED_CHAIN_ID) {
      throw new Error("Please switch to Ganache (ChainId 1337)");
    }

    setAccount(accounts[0]);
    setChainId(currentChain);

    return accounts[0];
  };

  return { account, chainId, connectWallet };
}