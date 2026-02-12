#  🏥 MediSure – Blockchain-Based Medicine Verification DApp

A full-stack decentralized application (DApp) that enables medicine authentication and ownership tracking using Ethereum blockchain.

Built with:

- ⚛️ React.js (Frontend)
- ⛓️ Ethereum + Ganache (Blockchain)
- 🦊 MetaMask (Wallet Integration)
- 📦 Truffle (Smart Contract Deployment)
- 🎨 Tailwind CSS (UI Design)

---

# 📌 Project Overview

MediSure ensures that medicines can be verified at every stage of the supply chain:

- 🏭 Manufacturer registers medicine
- 🚚 Distributor receives & transfers batches
- 🏪 Retailer verifies ownership
- 👤 Consumer scans QR to verify authenticity

All data is securely stored on the blockchain.

---

# 🏗️ Project Structure

```
medisure-dapp/
│
├── MediSure/                 # Smart Contract (Blockchain Backend)
│   ├── contracts/
│   ├── migrations/
│   ├── build/contracts/
│   ├── truffle-config.js
│   └── metamask-test.html
│
├── medisure-frontend-app/    # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── contracts/
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
```

---

# ⚙️ Installation Guide (From Scratch)

## 1️⃣ Clone Repository

```bash
git clone https://github.com/nikhil-tech21/medisure-dapp.git
cd medisure-dapp
```

---

# 🔗 Blockchain Setup (Smart Contract)

## 2️⃣ Install Truffle

```bash
npm install -g truffle
```

## 3️⃣ Install Dependencies

```bash
cd MediSure
npm install
```

## 4️⃣ Start Ganache

Open Ganache and use:

- RPC URL: `http://127.0.0.1:7545`
- Chain ID: `1337`

---

## 5️⃣ Deploy Contract

```bash
truffle compile
truffle migrate --reset
```

After deployment, copy the deployed contract address.

---

# ⚛️ Frontend Setup

## 6️⃣ Install Frontend Dependencies

```bash
cd ../medisure-frontend-app
npm install
```

---

## 7️⃣ Update Contract Address

Open:

```
src/utils/constants.js
```

Update:

```js
export const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
```

Make sure:

```js
chainId: "0x539" // 1337 in hex
```

---

## 8️⃣ Start Frontend

```bash
npm start
```

App runs at:

```
http://localhost:3000
```

---

# 🦊 MetaMask Configuration

Add Custom Network:

- Network Name: Ganache 1337
- RPC URL: http://127.0.0.1:7545
- Chain ID: 1337
- Currency Symbol: ETH

Import one Ganache private key into MetaMask.

---

# 🔎 How to Verify Blockchain Connection (Console Check)

Open browser console and run:

```js
await window.ethereum.request({ method: "eth_chainId" })
```

Expected:

```
'0x539'
```

Check contract deployed:

```js
await window.ethereum.request({
  method: "eth_getCode",
  params: ["YOUR_CONTRACT_ADDRESS", "latest"]
})
```

If result is NOT `"0x"` → Contract deployed correctly ✅

---

# 🎯 Features

### 👤 Role-Based Access
- Manufacturer
- Distributor
- Retailer
- Consumer

### 📦 Medicine Registration
Manufacturer can register:
- Batch ID
- Name
- Manufacturing Date
- Expiry Date
- IPFS hash

### 🔄 Ownership Transfer
Distributor → Retailer

### 📷 QR Code Verification
Consumer scans QR to verify medicine authenticity instantly.

### 🔐 Secure Smart Contract
All records immutable on Ethereum blockchain.

---

# 🧠 Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | React.js |
| Styling | Tailwind CSS |
| Blockchain | Ethereum |
| Smart Contracts | Solidity |
| Deployment | Truffle |
| Wallet | MetaMask |
| Local Blockchain | Ganache |

---

# 🚀 Future Improvements

- IPFS for storing medicine documents
- Admin analytics dashboard
- Real-time blockchain event listeners
- Production deployment (Polygon / Sepolia)
- Role-based authorization inside smart contract

---

# 👨‍💻 Author

**Nikhil Tiwari**  
GitHub: https://github.com/nikhil-tech21

---

# 📜 License

This project is built for educational and academic purposes.
