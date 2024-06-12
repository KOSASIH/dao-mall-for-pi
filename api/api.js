const express = require('express');
const Web3 = require('web3');
const app = express();
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/YOUR_PROJECT_ID'));

const daoContractAddress = '0x...DAOContractAddress...';
const daoContractABI = [...DAOContractABI...];

app.use(express.json());

app.post('/transfer', async (req, res) => {
  const { from, to, value } = req.body;
  const txCount = await web3.eth.getTransactionCount(from);
  const tx = {
    from,
    to: daoContractAddress,
    value: web3.utils.toWei(value, 'ether'),
    gas: '20000',
    gasPrice: web3.utils.toWei('20', 'gwei'),
    nonce: txCount
  };
  const signedTx = await web3.eth.accounts.signTransaction(tx, '0x...PRIVATE_KEY...');
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  res.json({ receipt });
});

app.post('/approve', async (req, res) => {
  const { owner, spender, value } = req.body;
  const txCount = await web3.eth.getTransactionCount(owner);
  const tx = {
    from: owner,
    to: daoContractAddress,
    data: daoContractABI.encodeFunctionCall('approve', [spender, value]),
    gas: '20000',
    gasPrice: web3.utils.toWei('20', 'gwei'),
    nonce: txCount
  };
  const signedTx = await web3.eth.accounts.signTransaction(tx, '0x...PRIVATE_KEY...');
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  res.json({ receipt });
});

app.listen(3000, () => {
  console.log('API listening on port 3000');
});
