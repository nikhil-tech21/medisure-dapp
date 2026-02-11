import { ethers } from "ethers";
import MediSure from "../contracts/MediSure.json";
import { CONTRACT_ADDRESS, NETWORK } from "../utils/constants";

let provider;
let signer;
let contract;

/* ================= ENSURE PROVIDER ================= */
function ensureEthereum() {
  if (!window.ethereum) {
    throw new Error("MetaMask not installed");
  }
}

/* ================= ENSURE NETWORK ================= */
async function ensureCorrectNetwork() {
  const chainId = await window.ethereum.request({
    method: "eth_chainId",
  });

  if (chainId !== NETWORK.chainId) {
    throw new Error(`Please switch MetaMask to ${NETWORK.chainName}`);
  }
}

/* ================= CONNECT WALLET ================= */
export async function connectWallet() {
  ensureEthereum();

  await ensureCorrectNetwork();

  provider = new ethers.BrowserProvider(window.ethereum);

  // Request account access
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  signer = await provider.getSigner();

  // Initialize contract
  contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    MediSure.abi,
    signer
  );

  console.log("✅ Wallet connected:", accounts[0]);
  console.log("🔗 Network:", NETWORK.chainName);
  console.log("📄 Contract:", CONTRACT_ADDRESS);

  return accounts[0];
}

/* ================= GET CONTRACT ================= */
export function getContract() {
  if (!contract) {
    throw new Error("Contract not initialized. Connect wallet first.");
  }
  return contract;
}

/* ================= ENSURE CONTRACT ================= */
async function ensureContract() {
  if (!contract) {
    await connectWallet();
  }
}

/* ================= REGISTER MEDICINE ================= */
export async function registerMedicine({
  batchId,
  name,
  mfgDate,
  expDate,
  ipfsHash,
}) {
  await ensureContract();

  const tx = await contract.registerMedicine(
    batchId,
    name,
    mfgDate,
    expDate,
    ipfsHash
  );

  await tx.wait();
  return tx.hash;
}

/* ================= VERIFY MEDICINE ================= */
export async function verifyMedicine(batchId) {
  await ensureContract();
  return await contract.verifyMedicine(batchId);
}

/* ================= TRANSFER OWNERSHIP ================= */
export async function transferOwnership(batchId, newOwner) {
  await ensureContract();

  const tx = await contract.transferOwnership(batchId, newOwner);
  await tx.wait();

  return tx.hash;
}