# Project Report

## Abstract

The Blockchain-Based Voting System is a local full-stack prototype for transparent election workflows. It combines Solidity smart-contract rules with a React interface and Express API.

## Problem Statement

Traditional demonstrations of voting systems often lack visible auditability and reliable duplicate-vote controls. This project models candidate management, voter eligibility, voting sessions, and result calculation using wallet identities and contract rules.

## Methodology

The system was developed in layers: contract design, Hardhat testing, backend API implementation, frontend integration, local network deployment, and manual workflow validation.

## Results

The prototype supports candidate registration, unique candidate addresses, explicit voter registration, one vote per registered wallet, participation lists, session controls, result calculation, and tie handling.

## Limitations

Backend state is in memory and resets when the server restarts. The project is intended for local demonstration and is not a production election platform. Production deployment would require independent security audits, persistent storage, authentication, privacy controls, and operational monitoring.

## Conclusion

The project demonstrates how blockchain rules, wallet identities, API services, and a browser interface can be combined into a reproducible voting prototype.
