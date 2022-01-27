import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const app = sdk.getAppModule("0x5d17426b24B692030AB0A009b3226A5F885538Ca");

(async ()=> {
    try {
        const bundleDropModule = await app.deployBundleDropModule({
            // The collection's name, ex. board Apes
            name: "SciDAO Membership",
            description: "A DAO for Sci-fi fans.",
            image: readFileSync("scripts/assets/DAONFT.png"),
            // we need to pass in the address of the person who will be receiving the proceeds from sales of nfts
            // here we are not charging pepole for the drop, so we will pass in the 0x0 address
            // you can set this to your wallet address if you want to charge for the drop
            primarySaleRecipientAddress: ethers.constants.AddressZero,
        });

        console.log(
            "✅ Successfully deployed bundleDrop module, address:",
            bundleDropModule.address,
        );
        console.log(
            "✅ bundleDrop metadata:",
            await bundleDropModule.getMetadata(),
        );
    } catch (error) {
        console.log("Failed to deploy bundleDrop module", error);
    }
})()