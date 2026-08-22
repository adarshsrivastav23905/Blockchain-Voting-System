# Project Definition

## Project Name

Blockchain-Based Voting System

## Purpose

This project demonstrates a transparent voting workflow using an Ethereum smart contract, a React web interface, and a Node.js/Express API.

## Scope

The prototype supports candidate registration, unique candidate wallet addresses, voter registration, one vote per registered wallet, voting-session controls, result calculation, and participation tracking.

## Project Status

Functional local prototype. Smart contract tests, frontend builds, and backend builds are available for local validation.

## Main Components

- Solidity Voting contract
- Hardhat local blockchain and deployment scripts
- React and TypeScript frontend
- Express and TypeScript backend
- Hardhat and Chai test suite

## Known Limitation

The backend data service currently uses in-memory storage and resets when the backend restarts. Production use would require persistent storage, authentication, monitoring, and security auditing.
