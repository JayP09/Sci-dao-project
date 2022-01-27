import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// Address of our ERC-20 token from step 5
const tokenModule = sdk.getTokenModule(
    "0x327E716635170d685a9e92f1A6Ee47D7E054EAc4"
);

(async () => {
    try {
        const amount = 100_000;
        // use utils from ethers to convert the amount to have 18 decimals
        const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(),18);

        // Interact with your deployed ERC-20 contract and mint the tokens!
        await tokenModule.mint(amountWith18Decimals);
        const totalSupply = await tokenModule.totalSupply();

        console.log(
            "✅ There now is",
            ethers.utils.formatUnits(totalSupply,18),
            "$SCI in circulation",
        )
    } catch (error) {
        console.log("Failed to print money",error);
    }
})();