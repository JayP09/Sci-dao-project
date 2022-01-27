import sdk from "./1-initialize-sdk.js";

const app = sdk.getAppModule("0x5d17426b24B692030AB0A009b3226A5F885538Ca");

(async () => {
    try {
        // Deploy a standard ERC-20 contract
        const tokenModule = await app.deployTokenModule({
            name: "SciDAO Governance Token",
            symbol: "SCI",
        });
        console.log(
            "✅ Successfully deployed token module, address:",
            tokenModule.address,
        );
    } catch (error) {
        console.error("failed to deploy token module",error);
    }
})();