import express, { Router, Request, Response } from 'express';
import { dataService } from '../services/dataService';

const router: Router = express.Router();

// Get voting status
router.get('/status', (req: Request, res: Response) => {
  const status = dataService.getVotingStatus();
  res.json({
    active: dataService.isVotingActive(),
    startTime: status.startTime,
    endTime: status.endTime,
    totalVotes: status.totalVotes,
  });
});

// Start voting
router.post('/start', (req: Request, res: Response) => {
  const durationInMinutes = Number(req.body.durationInMinutes);

  if (!Number.isFinite(durationInMinutes) || durationInMinutes <= 0) {
    return res.status(400).json({ error: 'Duration must be greater than 0' });
  }

  try {
    dataService.startVoting(durationInMinutes);
    res.json({ success: true, message: 'Voting started' });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// End voting
router.post('/end', (req: Request, res: Response) => {
  try {
    dataService.endVoting();
    res.json({ success: true, message: 'Voting ended' });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// Get results
router.get('/results', (req: Request, res: Response) => {
  const results = dataService.getResults();
  const winner = dataService.getWinner();
  res.json({ results, winner });
});

// Get statistics
router.get('/statistics', (req: Request, res: Response) => {
  const results = dataService.getResults();
  const totalVotes = dataService.getTotalVotes();
  const status = dataService.getVotingStatus();

  const statistics = {
    totalCandidates: results.length,
    totalVotes,
    votingActive: status.active,
    candidates: results,
  };

  res.json(statistics);
});

export default router;
