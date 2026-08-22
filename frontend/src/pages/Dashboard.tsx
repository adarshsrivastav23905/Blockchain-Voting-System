import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css';
import { getCandidates, getVotingStatus, getVotingStatistics } from '../utils/api';

interface Candidate {
  id: number;
  name: string;
  voteCount: number;
  description: string;
}

interface DashboardProps {
  isConnected: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ isConnected }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [votingActive, setVotingActive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [isConnected]);

  const fetchData = async () => {
    try {
      const [candidateData, statistics, status] = await Promise.all([
        getCandidates(),
        getVotingStatistics(),
        getVotingStatus(),
      ]);
      setCandidates(candidateData);
      setTotalVotes(statistics.totalVotes);
      setVotingActive(status.active);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="dashboard">
        <div className="alert alert-warning">
          Please connect your wallet to view the dashboard
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="dashboard"><p>Loading...</p></div>;
  }

  return (
    <div className="dashboard">
      <h1>Voting Dashboard</h1>
      
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Candidates</h3>
          <p className="stat-value">{candidates.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Votes</h3>
          <p className="stat-value">{totalVotes}</p>
        </div>
        <div className="stat-card">
          <h3>Voting Status</h3>
          <p className={`stat-value ${votingActive ? 'active' : 'inactive'}`}>
            {votingActive ? 'Active' : 'Inactive'}
          </p>
        </div>
      </div>

      <div className="candidates-section">
        <h2>Candidates</h2>
        <div className="candidates-grid">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="candidate-card">
              <h3>{candidate.name}</h3>
              <p>{candidate.description}</p>
              <div className="vote-count">
                Votes: <span className="count">{candidate.voteCount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
