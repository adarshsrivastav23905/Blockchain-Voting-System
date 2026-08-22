import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

interface NavbarProps {
  account: string;
  isConnected: boolean;
  onConnectWallet: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ account, isConnected, onConnectWallet }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🗳️ Blockchain Voting System
        </Link>
        <div className="nav-menu">
          <Link to="/" className="nav-link">Dashboard</Link>
          <Link to="/vote" className="nav-link">Vote</Link>
          <Link to="/admin" className="nav-link">Admin</Link>
          <button className="connect-btn" onClick={onConnectWallet}>
            {isConnected ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
