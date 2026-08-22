export interface Candidate {
  id: number;
  name: string;
  description: string;
  voteCount: number;
  candidateAddress: string;
}

export interface Voter {
  address: string;
  hasVoted: boolean;
  votedCandidateId: number;
  timestamp: number;
}

export interface VotingSession {
  active: boolean;
  startTime: number;
  endTime: number;
  totalVotes: number;
}
