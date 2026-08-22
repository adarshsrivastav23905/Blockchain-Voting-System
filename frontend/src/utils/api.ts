/**
 * Utility functions for API calls
 */

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

export const apiCall = async (
  endpoint: string,
  method: string = 'GET',
  body?: unknown
) => {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || `API Error: ${response.statusText}`);
  }

  return response.json();
};

export const getCandidates = () => apiCall('/api/candidates');

export const addCandidate = (name: string, description: string, candidateAddress: string) =>
  apiCall('/api/candidates', 'POST', { name, description, candidateAddress });

export const castVote = (voterAddress: string, candidateId: number) =>
  apiCall('/api/votes', 'POST', { voterAddress, candidateId });

export const getVotingResults = () => apiCall('/api/votes/results');

export const getVoterStatus = (address: string) =>
  apiCall(`/api/votes/status/${encodeURIComponent(address)}`);

export const registerVoters = (addresses: string[]) =>
  apiCall('/api/votes/register', 'POST', { addresses });

export const getVoters = () => apiCall('/api/votes/voters');

export const getVotingStatus = () => apiCall('/api/voting/status');

export const startVoting = (durationInMinutes: number) =>
  apiCall('/api/voting/start', 'POST', { durationInMinutes });

export const endVoting = () => apiCall('/api/voting/end', 'POST');

export const getVotingStatistics = () => apiCall('/api/voting/statistics');
