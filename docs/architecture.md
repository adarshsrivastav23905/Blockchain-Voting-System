# System Architecture

## Overview

The system has four cooperating layers: wallet, frontend, backend, and blockchain.

```text
MetaMask
   |
   v
React frontend ---> Express REST API ---> In-memory application state
   |
   v
Hardhat / Ethereum Voting contract
```

## Components

### Frontend

The React application provides Dashboard, Vote, and Admin pages. It reads the active MetaMask account and calls the backend API for the local demonstration workflow.

### Backend

The Express API validates requests, manages candidates and voters, records local votes, calculates results, and exposes health and statistics endpoints.

### Smart Contract

The Solidity contract enforces owner-only administration, unique candidate addresses, registered-voter checks, one vote per wallet, vote totals, and winner calculation on-chain.

### Local Network

Hardhat Node provides the local JSON-RPC endpoint at `http://127.0.0.1:8545` with chain ID `31337`.

## Data Flow

1. The administrator registers candidates and eligible voters.
2. A voting session is started.
3. A registered wallet selects one candidate.
4. The vote is validated and recorded.
5. Results and participation status are returned to the frontend.
