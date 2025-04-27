# QBitcoin Smart Contract Deployment Instructions

This document explains how to deploy the QBitcoin smart contract to a live Ethereum network using Hardhat.

## Prerequisites

- Node.js and npm installed
- An Ethereum testnet RPC URL (e.g., Infura or Alchemy)
- Private key of the deployer account (keep it secure!)
- Hardhat installed in the project

## Setup

1. Create a `.env` file in the `qbitcoin-game` directory with the following content:

```
GOERLI_RPC_URL=your_goerli_rpc_url
PRIVATE_KEY=your_private_key
```

2. Install dependencies:

```bash
npm install
```

3. Compile the smart contract:

```bash
npx hardhat compile
```

4. Deploy the smart contract to Goerli testnet (or other configured network):

```bash
npx hardhat run scripts/deploy-live.js --config hardhat-live.config.js --network goerli
```

5. After deployment, note the contract address printed in the console.

6. Update the frontend with the deployed contract address and ABI to enable real token minting.

## Notes

- Keep your private key secure and never share it.
- Use testnet tokens for deployment and testing.
- For mainnet deployment, configure the network accordingly and ensure you have sufficient ETH for gas fees.

## License

MIT License
