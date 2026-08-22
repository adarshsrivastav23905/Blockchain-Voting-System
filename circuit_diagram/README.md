# System Diagram

This project does not contain a physical circuit. Its system diagram is represented by the software architecture:

```text
MetaMask -> React frontend -> Express API
                    |
                    v
             Voting contract
                    |
                    v
       Candidates, voters, votes, results
```

For deployment details, see [the simulation guide](../docs/simulation.md) and [the architecture document](../docs/architecture.md).
