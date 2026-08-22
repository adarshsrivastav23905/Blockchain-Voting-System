# Configuration Mapping

This software project has no GPIO pin mapping. The equivalent integration mapping is listed below.

| System Element | Configuration |
| --- | --- |
| Smart contract source | `contracts/Voting.sol` |
| Contract deployment | `scripts/deploy.ts` |
| Contract address | `frontend/src/config/contractAddresses.json` |
| Contract ABI | `frontend/src/config/abi.ts` |
| Blockchain RPC | `http://127.0.0.1:8545` |
| Backend API | `http://localhost:5000` |
| Frontend application | `http://localhost:3000` |
| Candidate routes | `backend/src/routes/candidates.ts` |
| Vote routes | `backend/src/routes/votes.ts` |
| Session routes | `backend/src/routes/voting.ts` |
