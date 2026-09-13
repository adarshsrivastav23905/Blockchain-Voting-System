# Blockchain-Based Voting System

> A decentralized voting application using Ethereum smart contracts, a React frontend, and a Node.js/Express backend.

## Author

**Adarsh Srivastav**  
Computer Science and Engineering (CSE) Student
    
## Project Overview

The Blockchain-Based Voting System provides a transparent voting workflow backed by an Ethereum smart contract. Administrators can manage candidates, register voters, and control the voting session. Registered voters can cast one vote, while results and participation status are available through the web interface and REST API.

The project is intended for local development and demonstration using Hardhat, MetaMask, React, TypeScript, Express, and ethers.js.

## Objectives

- Provide transparent and tamper-resistant vote recording.
- Prevent duplicate votes from the same registered wallet.
- Manage candidates and eligible voters.
- Start and end voting sessions.
- Display live results and voter participation status.
- Provide a usable browser interface and REST API.

## Key Features

- Ethereum smart contract voting
- Owner-only candidate and voter management
- One-vote-per-registered-wallet protection
- Voting session start and end controls
- Candidate vote counting and winner calculation
- React dashboard, voting interface, and admin panel
- MetaMask wallet connection
- Express REST API
- In-memory backend data service for local development
- Hardhat contract tests

## System Architecture

```text
MetaMask wallet
       |
       v
React + TypeScript frontend
       |
       +---------------------> Express REST API
       |                              |
       v                              v
Ethereum Voting contract       In-memory data service
       |
       v
Candidates, voters, votes, results
```

## Voting Workflow

```text
Connect wallet
       |
       v
Admin registers candidates and voters
       |
       v
Admin starts the voting session
       |
       v
Registered voter selects a candidate
       |
       v
Vote is submitted and recorded
       |
       v
Duplicate voting is rejected
       |
       v
Results and participation status are displayed
```

## Smart Contract

The `Voting` contract provides:

- Candidate registration with name, description, and address
- Single and batch voter registration
- Registered-voter validation
- Voting session controls
- Vote casting with replay protection
- Total vote counting
- Winner and tie calculation
- Owner-only administrative operations

## Technology Stack

| Area | Technology |
| --- | --- |
| Blockchain | Ethereum / Hardhat |
| Smart contract | Solidity ^0.8.20 |
| Frontend | React 18, TypeScript |
| Backend | Node.js, Express, TypeScript |
| Web3 | ethers.js |
| Wallet | MetaMask |
| Testing | Hardhat, Chai |

## Project Structure

```text
Blockchain-Based-Voting-System/
├── contracts/
│   └── Voting.sol
├── frontend/
│   └── src/
│       ├── components/
│       ├── config/
│       ├── pages/
│       ├── styles/
│       ├── types/
│       └── utils/
├── backend/
│   └── src/
│       ├── models/
│       ├── routes/
│       └── services/
├── scripts/
│   └── deploy.ts
├── tests/
│   └── Voting.test.ts
├── docs/
│   ├── algorithm.md
│   ├── architecture.md
│   ├── hardware.md
│   ├── pin_mapping.md
│   ├── simulation.md
│   ├── testing.md
│   └── troubleshooting.md
├── circuit_diagram/
│   └── README.md
├── simulation/
│   └── README.md
├── test_cases/
│   └── README.md
├── reports/
│   └── project_report.md
├── screenshots/
│   └── README.md
├── hardhat.config.ts
├── package.json
└── README.md
```

## Prerequisites

- Node.js 16 or newer
- npm
- MetaMask
- Git

## Installation

Install the root dependencies and both application dependencies:

```bash
npm run install:all
```

Or install them individually:

```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

## Running the Project

Open separate terminals for the following services.

### 1. Start the local blockchain

```bash
npm run contracts:node
```

### 2. Deploy the contract

```bash
npm run contracts:deploy
```

This also updates the frontend contract address file.

### 3. Start the backend

```bash
npm run backend:dev
```

The API runs at `http://localhost:5000`.

### 4. Start the frontend

```bash
npm run frontend:dev
```

The web application runs at `http://localhost:3000`.

## Demonstration Screenshots

Use the following evidence set to document the complete application workflow. Capture only the relevant application area, keep the browser address bar visible when it helps establish the local URL, and never include private keys, seed phrases, or sensitive account information.

### Required Evidence

| # | Screenshot | What should be visible | Suggested filename |
| ---: | --- | --- | --- |
| 1 | Dashboard | Connected wallet, candidate count, total votes, and voting status | `01_dashboard.png` |
| 2 | Admin panel | Voting control and Add Candidate sections | `02_admin_panel.png` |
| 3 | Candidate registration | A newly added candidate visible in the admin or dashboard view | `03_candidate_registration.png` |
| 4 | Voter registration | Multiple registered wallet addresses in the admin panel | `04_voter_registration.png` |
| 5 | Candidate address validation | Duplicate candidate address rejected with a clear validation message | `05_candidate_address_validation.png` |
| 6 | Voting started | Admin panel showing that voting is active | `06_voting_started.png` |
| 7 | Active voting | Candidate selection screen while voting is active | `07_active_voting.png` |
| 8 | Successful vote | Confirmation that the vote was submitted and the voter cannot vote again | `08_successful_vote.png` |
| 9 | Duplicate vote prevention | Same wallet prevented from submitting a second vote | `09_duplicate_vote_prevention.png` |
| 10 | Multiple voters | Different registered wallets voting independently | `10_multiple_voters.png` |
| 11 | Participation lists | Separate lists for voters who have voted and voters who have not voted | `11_voter_participation.png` |
| 12 | Voting results | Candidate vote counts, total votes, and winner or tie result | `12_voting_results.png` |
| 13 | Closed voting | Admin panel showing that the voting session has ended | `13_voting_closed.png` |
| 14 | API health | `http://localhost:5000/health` returning a successful response | `14_backend_health.png` |
| 15 | Contract tests | Terminal showing the Hardhat test suite passing | `15_contract_tests.png` |

### How to Capture Them

1. Start the local blockchain, deploy the contract, start the backend, and start the frontend using the commands above.
2. Open `http://localhost:3000` and connect MetaMask to the local Hardhat network.
3. In **Admin**, add at least two candidates and register at least three voter wallet addresses.
4. Start voting and capture the active voting screen.
5. Use two different registered wallets to cast votes. Leave one registered wallet unused so both participation lists contain data.
6. Capture the results, then end the voting session and capture the closed state.
7. Open `http://localhost:5000/health` in a browser for the API evidence.
8. Run `npm run contracts:test` and capture the passing test output.
9. Use Windows Snipping Tool with `Win + Shift + S`, crop tightly, and save each image under `screenshots/` using the suggested names.

### Evidence Quality Checklist

- The screenshot clearly shows which feature is being demonstrated.
- Text is readable at normal document zoom.
- No private keys, seed phrases, passwords, or unnecessary personal data are visible.
- The filename matches the evidence item and the image is stored in `screenshots/`.
- Dynamic states such as active, voted, not voted, results, and closed are captured at the correct time.

## Frontend Pages

- **Dashboard:** candidate totals, vote totals, and voting status
- **Vote:** wallet-specific voting interface
- **Admin:** candidate management, voting controls, voter registration, and participation lists

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/health` | API health check |
| GET | `/api/candidates` | List candidates |
| POST | `/api/candidates` | Add a candidate |
| GET | `/api/candidates/:id` | Get one candidate |
| POST | `/api/votes/register` | Register eligible voter addresses |
| GET | `/api/votes/voters` | List voters who voted and have not voted |
| POST | `/api/votes` | Cast a vote |
| GET | `/api/votes/total` | Get total votes |
| GET | `/api/votes/status/:address` | Check voter status |
| GET | `/api/votes/results` | Get vote results and winners |
| GET | `/api/voting/status` | Get voting session status |
| POST | `/api/voting/start` | Start a voting session |
| POST | `/api/voting/end` | End a voting session |
| GET | `/api/voting/statistics` | Get voting statistics |

## Configuration

The frontend uses these defaults:

```text
Backend API: http://localhost:5000
Local RPC:   http://127.0.0.1:8545
Frontend:    http://localhost:3000
```

Environment variables can override the API and RPC configuration. Never commit private keys or API credentials.

## Testing

Run the smart contract test suite:

```bash
npm run contracts:test
```

Build both application layers:

```bash
cd backend && npm run build
cd ../frontend && npm run build
```

The current contract test suite covers candidate management, voter registration, voting rules, duplicate-vote prevention, session controls, totals, winners, and ties.

## Security Notes

- Only the contract owner can manage candidates, voters, and voting sessions.
- Only registered wallet addresses can vote.
- Each registered wallet can vote once.
- Contract rules are enforced on-chain.
- The backend stores local API state in memory and is not intended for production persistence.
- Production deployment would require audited contracts, persistent storage, authentication, rate limiting, and secure secret management.

## Limitations

- The backend data service is in-memory and resets when the server restarts.
- The current frontend and backend are local-development interfaces around the contract workflow.
- MetaMask and a configured local or remote Ethereum network are required for wallet interaction.
- Production security and infrastructure hardening are not included.

## Documentation

Detailed documentation is organized in the following Markdown files:

- [Project report](reports/project_report.md)
- [Architecture](docs/architecture.md)
- [Voting algorithm](docs/algorithm.md)
- [Testing guide](docs/testing.md)
- [Simulation and local setup](docs/simulation.md)
- [Troubleshooting](docs/troubleshooting.md)
- [Circuit and deployment notes](circuit_diagram/README.md)
- [Test cases](test_cases/README.md)
- [Screenshot evidence guide](screenshots/README.md)

## Project Status

Functional local prototype | Smart contract tests passing | Frontend and backend builds passing

## License

MIT
