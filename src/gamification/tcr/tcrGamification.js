import * as web3 from 'web3';
import { TCR } from 'tcr';

const tcrGamification = async () => {
  // Create a Web3 provider
  const provider = new web3.providers.HttpProvider('https://mainnet.infura.io/v3/YOUR_PROJECT_ID');

  // Create a TCR contract
  const tcr = new TCR('0x...TCRContractAddress...');

  // Create a new list on the TCR
  const list = await tcr.createList({
    name: 'Top Sellers',
    description: 'List of top-selling products',
  });

  // Add a product to the list
  await tcr.addToList(list, '0x...ProductId...');

  // Getthe current list of products
  const products = await tcr.getList(list);
  console.log(products); // array of product IDs

  // Award tokens to users who contribute to the list
  await tcr.awardTokens('0x...UserAddress...', 10);
};

tcrGamification();
