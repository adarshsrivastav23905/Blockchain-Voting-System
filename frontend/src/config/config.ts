import { ethers } from "ethers";
import { VOTING_ABI } from "./abi";
import contractAddresses from "./contractAddresses.json";

const RPC_URL = process.env.RPC_URL || "http://127.0.0.1:8545";
export const provider = new ethers.JsonRpcProvider(RPC_URL);

export { VOTING_ABI };

export const VOTING_CONTRACT_ADDRESS = process.env.REACT_APP_VOTING_CONTRACT_ADDRESS || contractAddresses.voting;