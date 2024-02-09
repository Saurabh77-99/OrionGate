import React from "react";
import { Outlet } from "react-router-dom";
import { useState} from 'react';
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import { CryptoProvider } from "../context/CryptoContext";
import { StorageProvider } from "../context/StorageContext";
import { TrendingProvider } from "../context/TrendingContext";

const Home = () => {
  const [userWalletAddress, setUserWalletAddress] = useState(null);

  const connectWalletwithMetaMask = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('MetaMask is not installed. Please install MetaMask to continue.');
      return;
    }

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }).catch((e) => {
      console.error(e.message);
      return;
    });

    if (!accounts) return;

    setUserWalletAddress(accounts[0]);
  };

  const signOutOfMetaMask = () => {
    setUserWalletAddress(null);
  };

  const checkBalance = async () => {
    if (!userWalletAddress) return;

    const balance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [userWalletAddress, 'latest']
    }).catch((err) => {
      console.error(err);
    });

    if (!balance) return;

    console.log(parseFloat(balance) / Math.pow(10, 18));
  };

  return (
    <CryptoProvider>
      <TrendingProvider>
        <StorageProvider>
          <main
            className="w-full h-full flex flex-col first-letter:
    content-center items-center relative text-white font-nunito
    "
          >
            <div className="w-screen h-screen bg-gray-300 fixed -z-10" />
            <Logo />
            <Navigation />
            <button className="bg-cyan w-19.5 text-white" onClick={userWalletAddress ? signOutOfMetaMask : connectWalletwithMetaMask}>
              {userWalletAddress ? 'Sign Out' : 'Connect Wallet'}
            </button>
            <button className="bg-cyan w-19.5 text-white" onClick={checkBalance}>Get Balance of Wallet</button>
            <p>{userWalletAddress ? `Wallet Address: ${userWalletAddress}` : 'Wallet not connected'}</p>
            <Outlet />
          </main>
        </StorageProvider>
      </TrendingProvider>
    </CryptoProvider>
  );
};

export default Home;
