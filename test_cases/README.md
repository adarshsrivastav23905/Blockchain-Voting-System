# Test Cases

| ID | Scenario | Expected result |
| --- | --- | --- |
| TC-01 | Add candidate with a unique valid address | Candidate is created |
| TC-02 | Add candidate with a reused address | Request is rejected |
| TC-03 | Register multiple unique voters | All voters are registered |
| TC-04 | Register duplicate voter addresses | Request is rejected |
| TC-05 | Start voting with a positive duration | Voting becomes active |
| TC-06 | Unregistered wallet attempts to vote | Request is rejected |
| TC-07 | Registered wallet casts a vote | Vote is recorded |
| TC-08 | Same wallet votes again | Request is rejected |
| TC-09 | Two different wallets vote | Both votes are recorded |
| TC-10 | End voting | Voting becomes inactive |
| TC-11 | Candidates have equal highest votes | All tied winners are returned |
| TC-12 | Backend health request | Successful health response |

## Execution

Automated contract tests are run with:

```bash
npm run contracts:test
```
