import { ethers } from 'ethers';

export async function connectWallet() {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });

  return accounts[0];
}

export async function getProvider() {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  return new ethers.BrowserProvider(window.ethereum);
}

export async function getSigner(provider: ethers.BrowserProvider) {
  return await provider.getSigner();
}
