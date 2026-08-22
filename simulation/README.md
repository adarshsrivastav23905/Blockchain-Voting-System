# Simulation

The local simulation uses Hardhat Node as the Ethereum network, MetaMask as the wallet, the Express server as the API, and the React app as the user interface.

## Quick Start

```bash
npm run contracts:node
npm run contracts:deploy
npm run backend:dev
npm run frontend:dev
```

Run each command in its own terminal. Open `http://localhost:3000` after all services are ready.

The local network uses chain ID `31337` and RPC URL `http://127.0.0.1:8545`.
