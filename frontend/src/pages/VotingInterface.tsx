import React, { useEffect, useState, useCallback } from 'react';
import '../styles/VotingInterface.css';
import { castVote, getCandidates, getVoterStatus, registerVoters } from '../utils/api';

interface Candidate {
  id: number;
  name: string;
  description: string;
}

interface VotingInterfaceProps {
  account: string;
  isConnected: boolean;
}

const VotingInterface: React.FC<VotingInterfaceProps> = ({ account, isConnected }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [checkingVoter, setCheckingVoter] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchCandidates = useCallback(async () => {
    try {
      setCandidates(await getCandidates());
    } catch (error) {
      console.error('Error fetching candidates:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const checkVotingStatus = useCallback(async () => {
    try {
      const data = await getVoterStatus(account);
      setIsRegistered(data.registered);
      setHasVoted(data.hasVoted);
    } catch (error) {
      console.error('Error checking voting status:', error);
    } finally {
      setCheckingVoter(false);
    }
  }, [account]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchCandidates();
    if (isConnected) {
      checkVotingStatus();
    }
  }, [isConnected, account, fetchCandidates, checkVotingStatus]);

  const handleVote = async () => {
    if (selectedCandidate === null) {
      alert('Please select a candidate');
      return;
    }

    setSubmitting(true);
    try {
      await castVote(account, selectedCandidate);
      alert('Vote submitted successfully!');
      setHasVoted(true);
      setSelectedCandidate(null);
    } catch (error) {
      console.error('Error submitting vote:', error);
      alert(error instanceof Error ? error.message : 'Error submitting vote');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegisterWallet = async () => {
    setRegistering(true);
    try {
      await registerVoters([account]);
      setIsRegistered(true);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Unable to register this wallet');
    } finally {
      setRegistering(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="voting-interface">
        <div className="alert alert-warning">
          Please connect your wallet to vote
        </div>
      </div>
    );
  }

  if (hasVoted) {
    return (
      <div className="voting-interface">
        <div className="alert alert-success">
          Thank you for voting! This wallet has already voted. To vote for another candidate, switch to a different registered voter wallet.
        </div>
      </div>
    );
  }

  if (checkingVoter) {
    return <div className="voting-interface"><p>Checking voter registration...</p></div>;
  }

  if (!isRegistered) {
    return (
      <div className="voting-interface">
        <div className="alert alert-warning">
          This wallet is not registered to vote. Ask the administrator to register your wallet address.
        </div>
        <button className="vote-button" onClick={handleRegisterWallet} disabled={registering}>
          {registering ? 'Registering wallet...' : 'Register This Wallet'}
        </button>
      </div>
    );
  }

  if (loading) {
    return <div className="voting-interface"><p>Loading candidates...</p></div>;
  }

  return (
    <div className="voting-interface">
      <h1>Cast Your Vote</h1>
      <p className="voter-info">Voting as: {account}</p>

      <div className="candidates-selection">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className={`candidate-option ${selectedCandidate === candidate.id ? 'selected' : ''}`}
            onClick={() => setSelectedCandidate(candidate.id)}
          >
            <input
              type="radio"
              name="candidate"
              value={candidate.id}
              checked={selectedCandidate === candidate.id}
              onChange={() => setSelectedCandidate(candidate.id)}
            />
            <div className="candidate-info">
              <h3>{candidate.name}</h3>
              <p>{candidate.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        className="vote-button"
        onClick={handleVote}
        disabled={submitting || selectedCandidate === null}
      >
        {submitting ? 'Submitting...' : 'Cast Vote'}
      </button>
    </div>
  );
};

export default VotingInterface;
