# Troubleshooting

## Hardhat Port Already in Use

If port `8545` is already listening, do not start a second node. Use the existing node or stop it before restarting.

## Wallet Not Registered

Register the exact connected MetaMask address from the Admin page. Switching MetaMask accounts changes the voter identity.

## Wallet Already Voted

A wallet can vote only once per election. Switch to another registered voter wallet to cast another vote.

## Duplicate Candidate Address

Every candidate requires a unique valid Ethereum address. Reusing an address returns a candidate-address validation error.

## Frontend Cannot Reach Backend

Confirm the backend is running at `http://localhost:5000` and check `http://localhost:5000/health`.

## Contract Address Mismatch

Restart Hardhat, deploy again, and confirm that `frontend/src/config/contractAddresses.json` contains the latest deployment address.

## React Cache Error

Stop the frontend, remove `frontend/node_modules/.cache`, and run `npm run frontend:dev` again.
