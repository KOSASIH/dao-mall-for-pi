import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [balance, setBalance] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [transferValue, setTransferValue] = useState('');
  const [approveValue, setApproveValue] = useState('');

  useEffect(() => {
    axios.get(`https://api.dao-mall.com/balance?address=${window.ethereum.selectedAddress}`)
      .then(response => setBalance(response.data.balance));
  }, []);

  const handleTransfer = async () => {
    try {
      const response = await axios.post('https://api.dao-mall.com/transfer', {
        from: window.ethereum.selectedAddress,
        to: '0x...RECIPIENT_ADDRESS...',
        value: transferValue
      });
      console.log(response.data.receipt);
    }catch (error) {
      console.error(error);
    }
  };

  const handleApprove = async () => {
    try {
      const response = await axios.post('https://api.dao-mall.com/approve', {
        owner: window.ethereum.selectedAddress,
        spender: '0x...SPENDER_ADDRESS...',
        value: approveValue
      });
      console.log(response.data.receipt);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>DAO Mall</h1>
      <p>Balance: {balance} DAO</p>
      <input
        type="number"
        placeholder="Transfer value"
        value={transferValue}
        onChange={e => setTransferValue(e.target.value)}
      />
      <button onClick={handleTransfer}>Transfer</button>
      <input
        type="number"
        placeholder="Approve value"
        value={approveValue}
        onChange={e => setApproveValue(e.target.value)}
      />
      <button onClick={handleApprove}>Approve</button>
    </div>
  );
}

export default App;
