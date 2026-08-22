import { expect } from "chai";
import { ethers } from "hardhat";
import { Voting } from "../contracts/typechain-types";

describe("Voting Contract", () => {
  let voting: Voting;
  let owner: any;
  let voter1: any;
  let voter2: any;
  let candidate1: any;
  let candidate2: any;

  beforeEach(async () => {
    const signers = await ethers.getSigners();
    owner = signers[0];
    voter1 = signers[1];
    voter2 = signers[2];
    candidate1 = signers[3];
    candidate2 = signers[4];

    const VotingFactory = await ethers.getContractFactory("Voting");
    voting = await VotingFactory.deploy();
    await voting.waitForDeployment();
  });

  describe("Candidate Management", () => {
    it("Should add a candidate", async () => {
      await voting.addCandidate(
        "Alice",
        "First candidate",
        candidate1.address
      );

      const candidates = await voting.getCandidates();
      expect(candidates.length).to.equal(1);
      expect(candidates[0].name).to.equal("Alice");
    });

    it("Should not allow non-owner to add candidate", async () => {
      await expect(
        voting.connect(voter1).addCandidate(
          "Bob",
          "Second candidate",
          candidate2.address
        )
      ).to.be.revertedWith("Only owner can call this function");
    });

    it("Should get candidate count", async () => {
      await voting.addCandidate("Alice", "First", candidate1.address);
      await voting.addCandidate("Bob", "Second", candidate2.address);

      const count = await voting.getCandidateCount();
      expect(count).to.equal(2);
    });
  });

  describe("Voter Registration", () => {
    it("Should register a voter", async () => {
      await voting.registerVoter(voter1.address);

      const isRegistered = await voting.isRegisteredVoter(voter1.address);
      expect(isRegistered).to.be.true;
    });

    it("Should not allow duplicate voter registration", async () => {
      await voting.registerVoter(voter1.address);

      await expect(voting.registerVoter(voter1.address)).to.be.revertedWith(
        "Voter already registered"
      );
    });

    it("Should register multiple voters", async () => {
      const voterAddresses = [voter1.address, voter2.address];
      await voting.registerMultipleVoters(voterAddresses);

      expect(await voting.isRegisteredVoter(voter1.address)).to.be.true;
      expect(await voting.isRegisteredVoter(voter2.address)).to.be.true;
    });
  });

  describe("Voting Process", () => {
    beforeEach(async () => {
      await voting.addCandidate("Alice", "First", candidate1.address);
      await voting.addCandidate("Bob", "Second", candidate2.address);
      await voting.registerVoter(voter1.address);
      await voting.registerVoter(voter2.address);
    });

    it("Should start voting", async () => {
      await voting.startVoting(60);

      const votingStatus = await voting.getVotingStatus();
      expect(votingStatus).to.be.true;
    });

    it("Should cast a vote", async () => {
      await voting.startVoting(60);
      await voting.connect(voter1).castVote(0);

      const candidate = await voting.getCandidate(0);
      expect(candidate.voteCount).to.equal(1);
    });

    it("Should not allow double voting", async () => {
      await voting.startVoting(60);
      await voting.connect(voter1).castVote(0);

      await expect(voting.connect(voter1).castVote(1)).to.be.revertedWith(
        "You have already voted"
      );
    });

    it("Should not allow unregistered voter to vote", async () => {
      await voting.startVoting(60);

      const unregisteredVoter = (await ethers.getSigners())[5];
      await expect(
        voting.connect(unregisteredVoter).castVote(0)
      ).to.be.revertedWith("Voter is not registered");
    });

    it("Should get total votes", async () => {
      await voting.startVoting(60);
      await voting.connect(voter1).castVote(0);
      await voting.connect(voter2).castVote(1);

      const totalVotes = await voting.getTotalVotes();
      expect(totalVotes).to.equal(2);
    });

    it("Should end voting", async () => {
      await voting.startVoting(60);
      await voting.endVoting();

      const votingStatus = await voting.getVotingStatus();
      expect(votingStatus).to.be.false;
    });
  });

  describe("Results", () => {
    beforeEach(async () => {
      await voting.addCandidate("Alice", "First", candidate1.address);
      await voting.addCandidate("Bob", "Second", candidate2.address);
      await voting.registerVoter(voter1.address);
      await voting.registerVoter(voter2.address);
      await voting.startVoting(1);
    });

    it("Should determine winner", async () => {
      await voting.connect(voter1).castVote(0);
      await voting.connect(voter2).castVote(0);

      // Wait for voting to end
      await ethers.provider.send("evm_increaseTime", [61]);

      await voting.endVoting();

      const winners = await voting.getWinner();
      expect(winners[0]).to.equal(0);
    });

    it("Should handle tie in voting", async () => {
      await voting.connect(voter1).castVote(0);
      await voting.connect(voter2).castVote(1);

      await ethers.provider.send("evm_increaseTime", [61]);

      await voting.endVoting();

      const winners = await voting.getWinner();
      expect(winners.length).to.equal(2);
    });
  });
});
