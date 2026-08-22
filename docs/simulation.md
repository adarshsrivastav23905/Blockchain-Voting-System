# Local Simulation Guide

## Start the Local Network

```bash
npm run contracts:node
```

Keep this terminal running.

## Deploy the Contract

In a second terminal:

```bash
npm run contracts:deploy
```

The deployment script writes the address to `frontend/src/config/contractAddresses.json`.

## Start the Applications

```bash
npm run backend:dev
```

```bash
npm run frontend:dev
```

Open `http://localhost:3000`.

## Configure MetaMask

Use the Hardhat Localhost network:

- RPC URL: `http://127.0.0.1:8545`
- Chain ID: `31337`
- Currency symbol: `ETH`

## Demonstration Flow

1. Connect MetaMask.
2. Add candidates with unique Ethereum addresses.
3. Register eligible voter addresses.
4. Start the voting session.
5. Vote once from each registered wallet.
6. Review results and participation lists.
7. End the voting session.
