import { ethers } from 'hardhat'

const main =async () => {
  const rsvpContractFactory = await ethers.getContractFactory("WeRsvp");
  const RSVP_Contract = await rsvpContractFactory.deploy();
  await RSVP_Contract.deployed();
  console.log('🚀  RSVP_Contract deployed to address => ', RSVP_Contract.address);
}

const runMain = async () => {
  try{
    await main();
    process.exit(0)
  }catch(err){
    console.log('🚀 ~ file: RSVP_Contract = deploy error => ', err)
    process.exit(1)
  }
}

runMain();
