# Blockchain-Based Voting System

This is a full-stack blockchain-based voting system with:
- **Smart Contracts**: Solidity smart contracts for secure voting on Ethereum
- **Frontend**: React application for voter interface
- **Backend**: Node.js/Express API server

## Quick Start

### 1. Install Dependencies

```bash
npm run install:all
```

### 2. Start Local Blockchain

```bash
npm run contracts:node
```

### 3. Deploy Smart Contracts

In a new terminal:

```bash
npm run contracts:deploy
```

### 4. Run Backend Server

In another terminal:

```bash
cd backend
npm run dev
```

Backend runs at: `http://localhost:5000`

### 5. Run Frontend

In another terminal:

```bash
cd frontend
npm start
```

Frontend runs at: `http://localhost:3000`

## API Documentation

### Candidates
- `GET /api/candidates` - Get all candidates
- `POST /api/candidates` - Add a new candidate

### Votes
- `POST /api/votes` - Cast a vote
- `GET /api/votes/total` - Get total votes cast
- `GET /api/votes/status/:address` - Check if voter has voted
- `GET /api/votes/results` - Get voting results

### Voting
- `GET /api/voting/status` - Get voting status
- `POST /api/voting/start` - Start voting
- `POST /api/voting/end` - End voting
- `GET /api/voting/results` - Get final results
- `GET /api/voting/statistics` - Get statistics

## Project Structure

```
├── contracts/          # Solidity smart contracts
├── frontend/           # React frontend
├── backend/            # Express backend
├── tests/              # Smart contract tests
├── scripts/            # Deployment scripts
└── hardhat.config.ts   # Hardhat configuration
```

## Testing

Run smart contract tests:

```bash
npm run contracts:test
```

## Environment Variables

Create a `.env` file in the root directory:

```
INFURA_API_KEY=your_infura_api_key
PRIVATE_KEY=your_wallet_private_key
PORT=5000
```

## License

MIT
