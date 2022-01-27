import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// Address of ERC-1155 membership NFT Contract.
const bundleDropModule = sdk.getBundleDropModule(
    "0x549e51d8814555F38f16a3B7F09CAeeb62Ae202B",
);

// Address of our ERC-20 token contract.
const tokenModule = sdk.getTokenModule(
    "0x327E716635170d685a9e92f1A6Ee47D7E054EAc4",
);

(async () => {
    try {
        // Grab all the address of the people who own our membership NFT, which has a tokenID of 0
        const walletAddresses = await bundleDropModule.getAllClaimerAddresses("0");

        if(walletAddresses.length === 0) {
            console.log(
                "No Nfts Have been claimed yet, maybe get some friends to claim your free NFTs!",
            );
            process.exit(0);
        }

        // Loop through the array of addresses
        const airdropTargets = walletAddresses.map((address) => {
            const randomAmount = Math.floor(Math.random() * (1000 - 100 + 1) + 100);
            console.log("✅ Going to airdrop",randomAmount, "tokens to", address);

            // Set up target
            const airdropTarget = {
                address,
                amount: ethers.utils.parseUnits(randomAmount.toString(),18),
            };

            return airdropTarget;
        });

        // call tarnsferBatch on all our airdrop targets
        console.log("🌈 Starting airdrop...");
        await tokenModule.transferBatch(airdropTargets);
        console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");
    } catch (error) {
        console.error("Failed to airdrop tokens", error);
    }
})();