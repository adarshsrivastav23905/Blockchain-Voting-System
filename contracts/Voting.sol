// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting {
    struct Candidate {
        uint256 id;
        string name;
        string description;
        uint256 voteCount;
        address candidateAddress;
    }

    address public owner;
    bool public votingActive;
    uint256 public candidateCount;
    uint256 public totalVotes;

    mapping(uint256 => Candidate) public candidates;
    mapping(address => bool) public candidateAddressUsed;
    mapping(address => bool) public hasVoted;
    mapping(address => bool) private registeredVoters;

    event VoteCasted(address indexed voter, uint256 indexed candidateId);
    event VotingStateChanged(bool isActive);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
        votingActive = false;
    }

    function addCandidate(
        string calldata _name,
        string calldata _description,
        address _candidateAddress
    ) external onlyOwner {
        require(_candidateAddress != address(0), "Candidate address is required");
        require(!candidateAddressUsed[_candidateAddress], "Candidate address already used");
        candidateAddressUsed[_candidateAddress] = true;
        candidates[candidateCount] = Candidate(
            candidateCount,
            _name,
            _description,
            0,
            _candidateAddress
        );
        candidateCount++;
    }

    function registerVoter(address _voter) external onlyOwner {
        require(!registeredVoters[_voter], "Voter already registered");
        registeredVoters[_voter] = true;
    }

    function registerMultipleVoters(address[] calldata _voters) external onlyOwner {
        for (uint256 i = 0; i < _voters.length; i++) {
            require(!registeredVoters[_voters[i]], "Voter already registered");
            registeredVoters[_voters[i]] = true;
        }
    }

    function isRegisteredVoter(address _voter) external view returns (bool) {
        return registeredVoters[_voter];
    }

    function startVoting(uint256 _durationInMinutes) external onlyOwner {
        require(_durationInMinutes > 0, "Duration must be greater than 0");
        votingActive = true;
    }

    function endVoting() external onlyOwner {
        votingActive = false;
        emit VotingStateChanged(false);
    }

    function castVote(uint256 _candidateId) external {
        require(votingActive, "Voting is not active");
        require(registeredVoters[msg.sender], "Voter is not registered");
        require(!hasVoted[msg.sender], "You have already voted");
        require(_candidateId < candidateCount, "Invalid candidate ID");

        hasVoted[msg.sender] = true;
        candidates[_candidateId].voteCount += 1;
        totalVotes++;

        emit VoteCasted(msg.sender, _candidateId);
    }

    function getCandidates() external view returns (Candidate[] memory) {
        Candidate[] memory items = new Candidate[](candidateCount);
        for (uint256 i = 0; i < candidateCount; i++) {
            items[i] = candidates[i];
        }
        return items;
    }

    function getCandidate(uint256 _candidateId) external view returns (Candidate memory) {
        require(_candidateId < candidateCount, "Invalid candidate ID");
        return candidates[_candidateId];
    }

    function getCandidateCount() external view returns (uint256) {
        return candidateCount;
    }

    function getVotingStatus() external view returns (bool) {
        return votingActive;
    }

    function getTotalVotes() external view returns (uint256) {
        return totalVotes;
    }

    function getWinner() external view returns (uint256[] memory) {
        if (candidateCount == 0) return new uint256[](0);

        uint256 highestVotes;
        for (uint256 i = 0; i < candidateCount; i++) {
            if (candidates[i].voteCount > highestVotes) {
                highestVotes = candidates[i].voteCount;
            }
        }

        uint256 winnerCount;
        for (uint256 i = 0; i < candidateCount; i++) {
            if (candidates[i].voteCount == highestVotes) winnerCount++;
        }

        uint256[] memory winners = new uint256[](winnerCount);
        uint256 index;
        for (uint256 i = 0; i < candidateCount; i++) {
            if (candidates[i].voteCount == highestVotes) winners[index++] = i;
        }
        return winners;
    }
}