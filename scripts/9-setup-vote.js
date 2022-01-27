import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// Governance contract
const voteModule = sdk.getVoteModule(
    "0x7c8B1E2cbc340F2fED9dddAeFac16eC68997a407",
);

// Our ERC-20 Token Contract
const tokenModule = sdk.getTokenModule(
    "0x327E716635170d685a9e92f1A6Ee47D7E054EAc4",
);

(async() => {
    try {
        await tokenModule.grantRole("minter",voteModule.address);
        console.log(
            "Sucesfully gave vote module permissions to act on token module"
        );
    } catch (error) {
        console.error("failed to grant vote module permissions on token module", error);
        process.exit();
    }

    try {
        // get wallet's toke balance
        const ownedTokenBalance = await tokenModule.balanceOf(
            process.env.WALLET_ADDRESS
        )

        const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
        const percent90 = ownedAmount.div(100).mul(90);

        await tokenModule.transfer(
            voteModule.address,
            percent90
        );
        console.log("✅ Successfully transferred tokens to vote module")
    } catch (error) {
        console.error("Failed to transfer tokens to vote module",error);
    }
})();