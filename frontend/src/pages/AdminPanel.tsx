import React from 'react';
import '../styles/AdminPanel.css';
import { addCandidate, endVoting, getVoters, getVotingStatus, registerVoters, startVoting } from '../utils/api';

interface Voter {
  address: string;
  hasVoted: boolean;
}

interface AdminPanelProps {
  account: string;
  isConnected: boolean;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ account, isConnected }) => {
  const [candidateName, setCandidateName] = React.useState('');
  const [candidateDescription, setCandidateDescription] = React.useState('');
  const [candidateAddress, setCandidateAddress] = React.useState('');
  const [candidateError, setCandidateError] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [votingActive, setVotingActive] = React.useState(false);
  const [startingVoting, setStartingVoting] = React.useState(false);
  const [durationInMinutes, setDurationInMinutes] = React.useState(60);
  const [loadingStatus, setLoadingStatus] = React.useState(true);
  const [voterAddresses, setVoterAddresses] = React.useState('');
  const [voterError, setVoterError] = React.useState('');
  const [votedVoters, setVotedVoters] = React.useState<Voter[]>([]);
  const [notVotedVoters, setNotVotedVoters] = React.useState<Voter[]>([]);
  const [loadingVoters, setLoadingVoters] = React.useState(true);

  const loadVoters = React.useCallback(async () => {
    try {
      const data = await getVoters();
      setVotedVoters(data.voted);
      setNotVotedVoters(data.notVoted);
    } catch (error) {
      console.error('Error loading voters:', error);
    } finally {
      setLoadingVoters(false);
    }
  }, []);

  React.useEffect(() => {
    getVotingStatus()
      .then((status) => setVotingActive(status.active))
      .catch((error) => console.error('Error loading voting status:', error))
      .finally(() => setLoadingStatus(false));
    loadVoters();
  }, [loadVoters]);

  const handleRegisterVoters = async (e: React.FormEvent) => {
    e.preventDefault();
    setVoterError('');
    const addresses = voterAddresses.split(/[\s,]+/).filter(Boolean);
    if (addresses.length === 0) return;

    try {
      await registerVoters(addresses);
      setVoterAddresses('');
      setLoadingVoters(true);
      await loadVoters();
    } catch (error) {
      setVoterError(error instanceof Error ? error.message : 'Error registering voters');
    }
  };

  const handleRegisterConnectedWallet = async () => {
    setVoterError('');
    try {
      await registerVoters([account]);
      setLoadingVoters(true);
      await loadVoters();
    } catch (error) {
      setVoterError(error instanceof Error ? error.message : 'Error registering connected wallet');
    }
  };

  const handleAddCandidate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCandidateError('');
    setSubmitting(true);

    try {
      await addCandidate(candidateName, candidateDescription, candidateAddress);
      alert('Candidate added successfully!');
      setCandidateName('');
      setCandidateDescription('');
      setCandidateAddress('');
    } catch (error) {
      console.error('Error adding candidate:', error);
      setCandidateError(error instanceof Error ? error.message : 'Error adding candidate');
    } finally {
      setSubmitting(false);
    }
  };

  const handleStartVoting = async () => {
    setStartingVoting(true);
    try {
      await startVoting(durationInMinutes);
      alert('Voting started successfully!');
      setVotingActive(true);
    } catch (error) {
      console.error('Error starting voting:', error);
      alert(error instanceof Error ? error.message : 'Error starting voting');
    } finally {
      setStartingVoting(false);
    }
  };

  const handleEndVoting = async () => {
    try {
      await endVoting();
      alert('Voting ended successfully!');
      setVotingActive(false);
    } catch (error) {
      console.error('Error ending voting:', error);
      alert(error instanceof Error ? error.message : 'Error ending voting');
    }
  };

  if (!isConnected) {
    return (
      <div className="admin-panel">
        <div className="alert alert-warning">
          Please connect your wallet to access admin panel
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      <div className="admin-section">
        <h2>Voting Control</h2>
        <div className={`voting-status ${votingActive ? 'is-active' : 'is-inactive'}`}>
          <span className="status-dot" aria-hidden="true"></span>
          <p>Status: <strong>{loadingStatus ? 'Checking...' : votingActive ? 'Active' : 'Inactive'}</strong></p>
        </div>
        <label className="duration-field" htmlFor="durationInMinutes">
          Voting duration (minutes)
          <input
            id="durationInMinutes"
            type="number"
            min="1"
            value={durationInMinutes}
            onChange={(e) => setDurationInMinutes(Number(e.target.value))}
            disabled={votingActive || startingVoting}
          />
        </label>
        <div className="button-group">
          <button 
            onClick={handleStartVoting} 
            disabled={startingVoting || votingActive || loadingStatus || durationInMinutes < 1}
            className="btn-primary"
          >
            {startingVoting ? 'Starting...' : 'Start Voting'}
          </button>
          <button 
            onClick={handleEndVoting} 
            disabled={!votingActive}
            className="btn-danger"
          >
            End Voting
          </button>
        </div>
      </div>

      <div className="admin-section">
        <h2>Voter Participation</h2>
        <form onSubmit={handleRegisterVoters}>
          <div className="form-group">
            <label htmlFor="voterAddresses">Voter wallet addresses</label>
            <textarea
              id="voterAddresses"
              value={voterAddresses}
              onChange={(e) => setVoterAddresses(e.target.value)}
              placeholder="Voter addresses only: one per line or comma-separated"
              required
            />
          </div>
          {voterError && <p className="form-error" role="alert">{voterError}</p>}
          <button type="submit">Register Voters</button>
        </form>
        <button type="button" onClick={handleRegisterConnectedWallet}>
          Register Connected Wallet
        </button>
        <div className="voter-lists">
          <div>
            <h3>Already voted ({votedVoters.length})</h3>
            {loadingVoters ? <p>Loading...</p> : votedVoters.length === 0 ? <p>None yet</p> : (
              <ul>{votedVoters.map((voter) => <li key={voter.address}>{voter.address}</li>)}</ul>
            )}
          </div>
          <div>
            <h3>Not voted ({notVotedVoters.length})</h3>
            {loadingVoters ? <p>Loading...</p> : notVotedVoters.length === 0 ? <p>None</p> : (
              <ul>{notVotedVoters.map((voter) => <li key={voter.address}>{voter.address}</li>)}</ul>
            )}
          </div>
        </div>
      </div>

      <div className="admin-section">
        <h2>Add Candidate</h2>
        <p className="form-help">Each candidate must have a unique wallet address. Do not enter voter addresses here.</p>
        <form onSubmit={handleAddCandidate}>
          <div className="form-group">
            <label htmlFor="candidateName">Candidate Name</label>
            <input
              type="text"
              id="candidateName"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="candidateDescription">Description</label>
            <textarea
              id="candidateDescription"
              value={candidateDescription}
              onChange={(e) => setCandidateDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="candidateAddress">Candidate wallet address</label>
            <input
              type="text"
              id="candidateAddress"
              value={candidateAddress}
              onChange={(e) => setCandidateAddress(e.target.value)}
              placeholder="Unique candidate wallet address: 0x..."
              pattern="^0x[a-fA-F0-9]{40}$"
              title="Enter a valid 42-character Ethereum address"
              required
            />
          </div>

          {candidateError && <p className="form-error" role="alert">{candidateError}</p>}

          <button type="submit" disabled={submitting}>
            {submitting ? 'Adding...' : 'Add Candidate'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
