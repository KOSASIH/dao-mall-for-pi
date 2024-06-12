module.exports = {
  // ...
  contracts_directory: './contracts',
  contracts: [
    'AdvancedToken.sol',
    'Governance.sol',
    'AdvancedNFT.sol',
    // ... other contracts ...
  ],
  migrations: [
    '1_initial_migration.js',
    '2_deploy_contracts.js',
    // ... other migrations ...
  ],
  // ...
};
