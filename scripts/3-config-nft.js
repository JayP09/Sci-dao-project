import sdk from "./1-initialize-sdk.js";
import {readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule("0x549e51d8814555F38f16a3B7F09CAeeb62Ae202B");

(async () => {
    try {
        await bundleDrop.createBatch([
            {
                name: "SciDAO Membership NFT",
                description: "This NFT will give you access to SciDAO!",
                image: readFileSync("scripts/assets/Membership.png"),
            },
        ]);
        console.log("✅ Successfully created a new NFT in the drop!")
    } catch (error) {
        console.log("failed to create the new NFT", error);
    }
})()