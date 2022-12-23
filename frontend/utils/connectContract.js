import { ethers } from "ethers";
import AbiJson from "./weRSVPContract.json"

function connectContract() {
    const contractAddress = "0xc47b2Ec686dE88F2A793d8ef6e7F2Ca86464EBe3"
    const weRSVPContractABI = AbiJson.abi
    let weRSVPContract 

    
    try {
        const {ethereum} =  window

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner();
            weRSVPContract = new ethers.Contract(contractAddress, weRSVPContractABI, signer)
        } else {
            console.log(' Ethereum Object does not Exist')
        }

        return weRSVPContract
        
    } catch (error) {
        console.log('🚀 ~ file: connectContract.js:9 ~ weRSVPContract connect ~ error', error)
    }

}

export default connectContract