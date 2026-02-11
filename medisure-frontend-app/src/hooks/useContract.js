import { useEffect } from "react";
import { connectWallet } from "../services/blockchainService";

export default function useContract() {
  useEffect(() => {
    if (window.ethereum) {
      // silently check if wallet already connected
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts) => {
          if (accounts.length > 0) {
            connectWallet().catch(() => {});
          }
        });
    }
  }, []);
}