import express, { Router, Request, Response } from 'express';
import { dataService } from '../services/dataService';

const router: Router = express.Router();

// Get all candidates
router.get('/', (req: Request, res: Response) => {
  const candidates = dataService.getCandidates();
  res.json(candidates);
});

// Get a specific candidate
router.get('/:id', (req: Request, res: Response) => {
  const candidate = dataService.getCandidate(parseInt(req.params.id));
  if (!candidate) {
    return res.status(404).json({ error: 'Candidate not found' });
  }
  res.json(candidate);
});

// Add a new candidate
router.post('/', (req: Request, res: Response) => {
  const { name, description, candidateAddress } = req.body;

  if (typeof name !== 'string' || !name.trim() || typeof description !== 'string' ||
      !description.trim() || typeof candidateAddress !== 'string' || !candidateAddress.trim()) {
    return res.status(400).json({ error: 'Name, description, and a valid candidate address are required' });
  }

  try {
    const candidate = dataService.addCandidate(name.trim(), description.trim(), candidateAddress);
    res.status(201).json(candidate);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid candidate address';
    res.status(message.includes('already registered') ? 409 : 400).json({ error: message });
  }
});

export default router;
