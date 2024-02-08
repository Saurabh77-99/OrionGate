import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';

const TradeBot = () => {
  const [marketData, setMarketData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get('/api/market-data')
        .then((response)=>{
          setMarketData(response.data)
        })
      } catch (error) {
        console.error('Error fetching market data:', error);
      }
    };

    const interval = setInterval(fetchData, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='container'>
      <h1>Market Data</h1>
      {marketData && (
        <div>
          <h2>XAI-INR Depth</h2>
          <pre>{JSON.stringify(marketData.xaiInrDepth, null, 2)}</pre>
          <h2>USDT-INR Depth</h2>
          <pre>{JSON.stringify(marketData.usdtInrDepth, null, 2)}</pre>
          <h2>XAI-USDT Depth</h2>
          <pre>{JSON.stringify(marketData.xaiUsdtDepth, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
  
export default TradeBot;