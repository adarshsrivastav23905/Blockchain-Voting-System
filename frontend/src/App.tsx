import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import VotingInterface from './pages/VotingInterface';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const [account, setAccount] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);

  const refreshWallet = useCallback(async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        });
        setAccount(accounts[0] || '');
        setIsConnected(accounts.length > 0);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  }, []);

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask to connect your wallet');
      return;
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x7A69' }],
      });
    } catch (error: any) {
      if (error?.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x7A69',
            chainName: 'Hardhat Localhost',
            nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
            rpcUrls: ['http://127.0.0.1:8545'],
          }],
        });
      } else {
        throw error;
      }
    }

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0] || '');
    setIsConnected(accounts.length > 0);
  }, []);

  useEffect(() => {
    refreshWallet();
    if (!window.ethereum) return;

    window.ethereum.on('accountsChanged', refreshWallet);
    return () => window.ethereum?.removeListener('accountsChanged', refreshWallet);
  }, [refreshWallet]);

  return (
    <Router>
      <div className="App">
        <Navbar account={account} isConnected={isConnected} onConnectWallet={connectWallet} />
        <Routes>
          <Route path="/" element={<Dashboard isConnected={isConnected} />} />
          <Route path="/vote" element={<VotingInterface account={account} isConnected={isConnected} />} />
          <Route path="/admin" element={<AdminPanel account={account} isConnected={isConnected} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
