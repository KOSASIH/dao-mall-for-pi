# DAO Mall for Pi Contracts

This document provides an overview of the smart contracts used in the DAO Mall for Pi project.

## Contracts

### Mall

The Mall contract is the main contract in the DAO Mall for Pi project. It manages the marketplace and provides an interface for users to interact with the platform.

#### Functions

- `createProduct(string memory name, string memory description, uint256 price, string memory image)`: Creates a new product in the marketplace.
- `getProduct(uint256 id)`: Returns the details of a specific product.
- `buyProduct(uint256 id, uint256 quantity)`: Buys a product from the marketplace.
- `getOrder(uint256 id)`: Returns the details of a specific order.
- `getOrdersByUser(address user)`: Returns a list of orders placed by a specific user.

### DAO

The DAO contract is used to manage the decentralized autonomous organization (DAO) for the marketplace. It provides an interface for users to propose and vote on changes to the platform.

#### Functions

- `propose(string memory description)`: Proposes a new change to the platform.
- `vote(uint256 proposalId, bool support)`: Votes on a specific proposal.
- `getProposals()`: Returns a list of proposals.
- `getProposal(uint256 id)`: Returns the details of a specific proposal.
- `getVotes(uint256 proposalId, address user)`: Returns the votes of a specific user on a specific proposal.

## Events

### Mall

- `ProductCreated(uint256 id, string name, string description, uint256 price, string image)`: Emitted when a new product is created.
- `ProductBought(uint256 id, address buyer, uint256 quantity)`: Emitted when a product is bought.
- `OrderCreated(uint256 id, uint256 productId, address buyer, uint256 quantity)`: Emitted when a new order is created.
- `OrderCompleted(uint256 id, address seller, uint256 quantity)`: Emitted when an order is completed.

### DAO

- `ProposalCreated(uint256 id, string description, address proposer)`: Emitted when a new proposal is created.
- `VoteCast(uint256 proposalId, address voter, bool support)`: Emitted when a user votes on a proposal.
- `ProposalExecuted(uint256 proposalId)`: Emitted when a proposal is executed.
