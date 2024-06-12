import * as fabric from 'fabric-network';
import { SupplyChain } from './supplyChain';

const supplyChainTracker = async () => {
  // Create a Fabric network
  const network = new fabric.Network('supply-chain-network');

  // Create a new supply chain transaction
  const transaction = await network.createTransaction({
    type: 'shipment',
    productId: '0x...ProductId...',
    from: '0x...SenderAddress...',
    to: '0x...RecipientAddress...',
  });

  // Add the transaction to the supply chain
  await SupplyChain.addTransaction(transaction);

  // Get the supply chain history for a product
  const history = await SupplyChain.getHistory('0x...ProductId...');
  console.log(history); // array of supply chain transactions
};

supplyChainTracker();
