# WeMeet Web3 Event Dapp

A web3-built event platform that allows any one organise events and track RSVPs and attendees. Attendees will need to deposit ETH to rsvp and will get it back upon showing up / Check in at the event

Backend is built with
Solidty
Deployed with Infura
On Polygon Mumbai
Connected GraphQL API with the graph


Frontend build using
React
Next.js 
ethers.js to interact with our deployed smart contract
Rainbowkit React library for an intuitive multi-wallet experience
Web3.Storage to store data off-chain

 the frontend app can work with Coinbase Wallet or other user-controlled wallets like MetaMask, Rainbow, and WalletConnect.

 Update Solidity
 Test Code: num run script
 Deploy Contract: npm run deploy. Obtain new Contract Address
 verify on Polygon Scan: https://mumbai.polygonscan.com

 Update Graph scheme 
 Update schema.graphql
 subgraph.yaml : contract address,  entity, eventHandlers,
 update with contract address 

 generate AssemblyScript types: run graph codegen && graph build
 deploy graph: 
    graph auth --product hosted-service <ACCESS_TOKEN> 
    graph deploy --product hosted-service <GITHUB_USER>/<SUBGRAPH NAME>

Update frontend 
update with new Contract Address in utils.connectContract.js
Update Abi in utils/weRSVPContract.json.js

