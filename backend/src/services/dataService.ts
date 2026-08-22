import { Candidate, Voter, VotingSession } from '../models/types';
import { getAddress } from 'ethers';

class DataService {
  private candidates: Map<number, Candidate> = new Map();
  private voters: Map<string, Voter> = new Map();
  private votingSession: VotingSession = {
    active: false,
    startTime: 0,
    endTime: 0,
    totalVotes: 0,
  };
  private candidateIdCounter: number = 0;

  normalizeAddress(address: string): string {
    return getAddress(address.trim());
  }

  // Candidate methods
  addCandidate(name: string, description: string, candidateAddress: string): Candidate {
    candidateAddress = this.normalizeAddress(candidateAddress);
    if (this.candidatesHasAddress(candidateAddress)) {
      throw new Error('Candidate address is already registered');
    }

    const candidate: Candidate = {
      id: this.candidateIdCounter++,
      name,
      description,
      voteCount: 0,
      candidateAddress,
    };
    this.candidates.set(candidate.id, candidate);
    return candidate;
  }

  private candidatesHasAddress(address: string): boolean {
    return Array.from(this.candidates.values()).some(
      (candidate) => candidate.candidateAddress === address
    );
  }

  getCandidates(): Candidate[] {
    return Array.from(this.candidates.values());
  }

  getCandidate(id: number): Candidate | undefined {
    return this.candidates.get(id);
  }

  updateCandidateVotes(id: number, increment: number = 1): void {
    const candidate = this.candidates.get(id);
    if (candidate) {
      candidate.voteCount += increment;
    }
  }

  // Voter methods
  registerVoter(address: string): boolean {
    address = this.normalizeAddress(address);
    if (this.voters.has(address)) {
      return false;
    }

    this.voters.set(address, {
      address,
      hasVoted: false,
      votedCandidateId: -1,
      timestamp: 0,
    });
    return true;
  }

  hasVoterVoted(address: string): boolean {
    address = this.normalizeAddress(address);
    const voter = this.voters.get(address);
    return voter ? voter.hasVoted : false;
  }

  isRegisteredVoter(address: string): boolean {
    address = this.normalizeAddress(address);
    return this.voters.has(address);
  }

  getVoters(): Voter[] {
    return Array.from(this.voters.values()).map((voter) => ({ ...voter }));
  }

  castVote(voterAddress: string, candidateId: number): boolean {
    voterAddress = this.normalizeAddress(voterAddress);
    const voter = this.voters.get(voterAddress);
    if (!voter || voter.hasVoted || !this.candidates.has(candidateId)) {
      return false;
    }

    voter.hasVoted = true;
    voter.votedCandidateId = candidateId;
    voter.timestamp = Date.now();

    this.updateCandidateVotes(candidateId, 1);
    this.votingSession.totalVotes++;

    return true;
  }

  // Voting session methods
  startVoting(durationInMinutes: number): void {
    this.votingSession.active = true;
    this.votingSession.startTime = Date.now();
    this.votingSession.endTime = Date.now() + durationInMinutes * 60 * 1000;
  }

  endVoting(): void {
    this.votingSession.active = false;
  }

  getVotingStatus(): VotingSession {
    this.isVotingActive();
    return this.votingSession;
  }

  isVotingActive(): boolean {
    if (this.votingSession.active && this.votingSession.endTime <= Date.now()) {
      this.votingSession.active = false;
    }

    return this.votingSession.active;
  }

  getTotalVotes(): number {
    return this.votingSession.totalVotes;
  }

  getResults(): Array<{ id: number; name: string; votes: number }> {
    return Array.from(this.candidates.values()).map((c) => ({
      id: c.id,
      name: c.name,
      votes: c.voteCount,
    }));
  }

  getWinner(): number[] {
    if (this.candidates.size === 0) return [];

    const candidates = Array.from(this.candidates.values());
    const maxVotes = Math.max(...candidates.map((c) => c.voteCount));

    return candidates
      .filter((c) => c.voteCount === maxVotes)
      .map((c) => c.id);
  }

  // Reset methods
  resetData(): void {
    this.candidates.clear();
    this.voters.clear();
    this.votingSession = {
      active: false,
      startTime: 0,
      endTime: 0,
      totalVotes: 0,
    };
    this.candidateIdCounter = 0;
  }
}

// Singleton instance
export const dataService = new DataService();
