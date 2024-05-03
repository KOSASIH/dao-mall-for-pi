# Getting Started

This guide will help you set up and run DAO Mall for Pi on your local machine.

## Prerequisites

- Node.js installed
- Truffle installed
- Pi network node running

## Installation

1. Clone the repository: `git clone https://github.com/KOSASIH/dao-mall-for-pi.git`
2. Install dependencies: `npm install`
3. Configure settings: Update the necessary configurations in `config.js`.

## Configuration

Update the following configurations in `config.js`:

- `piNodeUrl`: The URL of your Pi node.
- `privateKey`: Your Pi private key.

## Running the Application

1. Compile the contracts: `truffle compile`
2. Migrate the contracts: `truffle migrate`
3. Start the application: `npm start`

## Testing

1. Run the tests: `truffle test`

## Deployment

To deploy the application to a Pi network, follow these steps:

1. Compile the contracts: `truffle compile`
2. Migrate the contracts: `truffle migrate --network pi`

## Troubleshooting

If you encounter any issues, please refer to the [Troubleshooting](#troubleshooting) section in the [FAQ](#faq).
