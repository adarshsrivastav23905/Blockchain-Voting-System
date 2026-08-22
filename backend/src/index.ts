import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import candidatesRouter from './routes/candidates';
import votesRouter from './routes/votes';
import votingRouter from './routes/voting';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/candidates', candidatesRouter);
app.use('/api/votes', votesRouter);
app.use('/api/voting', votingRouter);

// Root endpoint with API documentation
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Blockchain Voting System API',
    version: '1.0.0',
    endpoints: [
      { method: 'GET', path: '/api/candidates', description: 'Get all candidates' },
      { method: 'POST', path: '/api/candidates', description: 'Add a new candidate' },
      { method: 'POST', path: '/api/votes', description: 'Cast a vote' },
      { method: 'GET', path: '/api/votes/total', description: 'Get total votes' },
      { method: 'GET', path: '/api/votes/status/:address', description: 'Check voter status' },
      { method: 'GET', path: '/api/votes/results', description: 'Get voting results' },
      { method: 'GET', path: '/api/voting/status', description: 'Get voting status' },
      { method: 'POST', path: '/api/voting/start', description: 'Start voting' },
      { method: 'POST', path: '/api/voting/end', description: 'End voting' },
      { method: 'GET', path: '/api/voting/results', description: 'Get final results' },
      { method: 'GET', path: '/api/voting/statistics', description: 'Get statistics' }
    ]
  });
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
