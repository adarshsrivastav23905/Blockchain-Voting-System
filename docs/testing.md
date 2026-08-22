# Testing and Validation

## Automated Checks

Run smart contract tests:

```bash
npm run contracts:test
```

Build the backend:

```bash
cd backend
npm run build
```

Build the frontend:

```bash
cd frontend
npm run build
```

## Covered Behaviors

- Candidate creation and ownership checks
- Unique candidate addresses
- Single and batch voter registration
- Duplicate voter rejection
- Active and inactive voting sessions
- Registered-voter enforcement
- One vote per wallet
- Total vote counts
- Winner and tie calculation

## Manual Checks

Verify the API health endpoint at `http://localhost:5000/health`, then confirm that the frontend loads at `http://localhost:3000` and that MetaMask is connected to chain ID `31337`.
