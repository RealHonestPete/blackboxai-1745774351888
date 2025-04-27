# QBitcoin Proof of Click (PoC) Game

This project implements a clicker game called QBitcoin based on the Cookie Clicker game, with a Proof of Click (PoC) cryptocurrency mechanism on the Ethereum network.

## Features

- QBitcoin ERC20 token with a max supply of 21 quadrillion tokens.
- Users connect their MetaMask wallet to play.
- Users earn QBitcoin tokens by clicking the big Bitcoin button.
- Pointer upgrades increase tokens earned per click (up to 5x).
- Built with Tailwind CSS and vanilla JavaScript.
- Smart contract development and deployment using Hardhat.

## Setup

### Prerequisites

- Node.js and npm installed
- MetaMask browser extension installed
- Basic knowledge of Ethereum and smart contracts

### Install dependencies

```bash
cd qbitcoin-game
npm install
```

### Compile and deploy smart contract

```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network hardhat
```

### Run frontend

Open `index.html` in a browser with MetaMask installed.

## Notes

- The smart contract minting interaction is currently simulated in the frontend.
- Actual blockchain interaction requires contract deployment and integration with ethers.js or web3.js.
- The game UI is adapted from Cookie Clicker with Bitcoin branding.
- No auto mining; all QBitcoin tokens are earned by manual clicks.

## License

MIT License
