# Voting Algorithm

## Candidate Registration

1. Validate candidate name and description.
2. Validate the candidate Ethereum address.
3. Normalize the address to checksum format.
4. Reject an address already assigned to another candidate.
5. Store the candidate with a zero vote count.

## Voter Registration

1. Receive one or more wallet addresses.
2. Validate every address.
3. Normalize every address.
4. Reject duplicate addresses in the request.
5. Reject addresses already registered.
6. Store each voter with `hasVoted = false`.

## Vote Casting

1. Validate the voter address and candidate ID.
2. Confirm that voting is active.
3. Confirm that the candidate exists.
4. Confirm that the wallet is registered.
5. Confirm that the wallet has not voted.
6. Mark the voter as having voted.
7. Increment the selected candidate and total vote counts.
8. Return a successful response.

## Winner Calculation

The system finds the highest candidate vote count and returns every candidate with that count. Multiple IDs are returned when the result is a tie.
