import { ethers } from "ethers";
import AbiJson from "./weRSVPContract.json"

function connectContract() {
    const contractAddress = "0xFD00aacB7bD4a31b43A98FBD75A107BAD4bf5669"
    const weRSVPContractABI = AbiJson.abi
    let weRSVPContract 

    
    try {
        const {ethereum} =  window

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner();
            weRSVPContract = new ethers.Contract(contractAddress, weRSVPContractABI, signer)
            // const code = provider.getCode(contractAddress)
            // console.log('🚀 ~ file: connectContract.js:18 ~CHECK connectContract ~ code', code)
        } else {
            console.log(' Ethereum Object does not Exist')
        }

        return weRSVPContract
        
    } catch (error) {
        console.log('🚀 ~ file: connectContract.js:9 ~ weRSVPContract connect ~ error', error)
    }

}

export default connectContract