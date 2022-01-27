import { ThirdwebSDK } from "@3rdweb/sdk";
import ethers from "ethers";

import dotenv from "dotenv";
dotenv.config();

// some quick check to make sure our .env is working
if(!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY == ""){
    console.log("🛑 Private key not found.")
}

if(!process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL == "") {
    console.log("🛑 Alchemy API URL not found.")
}

if(!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS == ""){
    console.log("🛑 Wallet Address not found.")
}


const sdk = new ThirdwebSDK(
    new ethers.Wallet(
        process.env.PRIVATE_KEY,
        // RPC URL, use ALCHEMY API URL from .env file
        ethers.getDefaultProvider(process.env.ALCHEMY_API_URL),
    ),
);

(async () => {
    try {
        const apps = await sdk.getApps();
        console.log("Your app address is:", apps[0].address);
    } catch (error) {
        console.log("Failed to get apps from the sdk", error);
        process.exit(1);
    }
})()

// exporting the initialized thirdweb SDK so that use it in our other scripts
export default sdk;