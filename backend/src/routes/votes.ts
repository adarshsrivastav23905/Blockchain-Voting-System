import express, { Router, Request, Response } from 'express';
import { dataService } from '../services/dataService';

const router: Router = express.Router();

// Register eligible voters before the election starts
router.post('/register', (req: Request, res: Response) => {
  const { addresses } = req.body;
  if (!Array.isArray(addresses) || addresses.length === 0 ||
      addresses.some((address) => typeof address !== 'string' || !address.trim())) {
    return res.status(400).json({ error: 'A non-empty list of voter addresses is required' });
  }

  try {
    const normalizedAddresses = addresses.map((address: string) => dataService.normalizeAddress(address));
    const uniqueAddresses = new Set(normalizedAddresses);

    if (uniqueAddresses.size !== normalizedAddresses.length) {
      return res.status(409).json({ error: 'Duplicate voter addresses are not allowed' });
    }

    if (normalizedAddresses.some((address) => dataService.getVoters().some((voter) => voter.address === address))) {
      return res.status(409).json({ error: 'One or more voter addresses are already registered' });
    }

    normalizedAddresses.forEach((address) => dataService.registerVoter(address));
    res.status(201).json({ success: true, voters: dataService.getVoters() });
  } catch {
    res.status(400).json({ error: 'Every voter address must be a valid Ethereum address' });
  }
});

// List registered voters and participation status
router.get('/voters', (req: Request, res: Response) => {
  const voters = dataService.getVoters();
  res.json({
    voted: voters.filter((voter) => voter.hasVoted),
    notVoted: voters.filter((voter) => !voter.hasVoted),
  });
});

// Cast a vote
router.post('/', (req: Request, res: Response) => {
  const { voterAddress, candidateId } = req.body;
  const numericCandidateId = Number(candidateId);

  if (typeof voterAddress !== 'string' || !voterAddress.trim() ||
      !Number.isInteger(numericCandidateId) || numericCandidateId < 0) {
    return res.status(400).json({ error: 'Voter address and candidate ID are required' });
  }

  try {
    dataService.normalizeAddress(voterAddress);
  } catch {
    return res.status(400).json({ error: 'Voter address must be a valid Ethereum address' });
  }

  // Check if voting is active
  if (!dataService.isVotingActive()) {
    return res.status(400).json({ error: 'Voting is not active' });
  }

  if (!dataService.getCandidate(numericCandidateId)) {
    return res.status(400).json({ error: 'Candidate not found' });
  }

  try {
    if (!dataService.isRegisteredVoter(voterAddress)) {
      return res.status(403).json({ error: 'This wallet is not registered to vote' });
    }
    if (dataService.hasVoterVoted(voterAddress)) {
      return res.status(409).json({ error: 'This wallet has already voted' });
    }
  } catch {
    return res.status(400).json({ error: 'Voter address must be a valid Ethereum address' });
  }

  // Cast vote
  const success = dataService.castVote(voterAddress.trim(), numericCandidateId);

  if (!success) {
    return res.status(409).json({ error: 'This wallet has already voted' });
  }

  res.json({ success: true, message: 'Vote submitted successfully' });
});

// Get total votes
router.get('/total', (req: Request, res: Response) => {
  const total = dataService.getTotalVotes();
  res.json({ total });
});

// Check voter status
router.get('/status/:address', (req: Request, res: Response) => {
  try {
    const hasVoted = dataService.hasVoterVoted(req.params.address);
    const registered = dataService.isRegisteredVoter(req.params.address);
    res.json({ registered, hasVoted });
  } catch {
    res.status(400).json({ error: 'Voter address must be a valid Ethereum address' });
  }
});

// Get results
router.get('/results', (req: Request, res: Response) => {
  const results = dataService.getResults();
  const winner = dataService.getWinner();
  res.json({ results, winner });
});

export default router;
