import {ethers} from "ethers";
import sdk from "./1-initialize-sdk.js";

// Voting contract
const voteModule = sdk.getVoteModule(
    "0x7c8B1E2cbc340F2fED9dddAeFac16eC68997a407",
);

// ERC-20 Token Contract
const tokenModule = sdk.getTokenModule(
    "0x327E716635170d685a9e92f1A6Ee47D7E054EAc4",
);

(async () => {
    try {
        const amount = 42_000;
        // create proposal to mint 42,000 new token to the treasury
        await voteModule.propose(
            "Should the DAO mint an additional "+ amount + " tokens into the treasury?",
            [
                {
                    // Our nativeToken is ETH. nativeTokenValue is the amount of ETH we want
                    // to send in this proposal. In this case, we're sending 0 ETH.
                    // We're just minting new tokens to the treasury. So, set to 0.
                    nativeTokenValue: 0,
                    transactionData: tokenModule.contract.interface.encodeFunctionData(
                        // We're doing a mint! And, we're minting to the voteModule, which is
                        // acting as our treasury.
                        "mint",
                        [
                            voteModule.address,
                            ethers.utils.parseUnits(amount.toString(),18),
                        ]
                    ),
                    // our token module that actually executes the mint
                    toAddress: tokenModule.address,
                },
            ]
        );
        console.log("✅ Successfully created proposal to mint tokens");
    } catch (error) {
        console.error("Failed to create first proposal",error);
        process.exit(1);
    }

    try {
        const amount = 690;
        // Create proposal to transfer ourselves 6,900 tokens for being awesome.
        await voteModule.propose(
            "Should the DAO tarnsfer "+ amount + " tokens from the treasury to "+ process.env.WALLET_ADDRESS + " for being awesome?",
            [
                {
                    nativeTokenValue:0,
                    transactionData: tokenModule.contract.interface.encodeFunctionData(
                        "transfer",
                        [
                            process.env.WALLET_ADDRESS,
                            ethers.utils.parseUnits(amount.toString(),18),
                        ]
                    ),
                    toAddress: tokenModule.address,
                },
            ]
        );
        
        console.log("✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!");
    } catch (error) {
        console.error("Failed to create second proposal",error);
    }
})()