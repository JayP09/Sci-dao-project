import sdk from "./1-initialize-sdk.js";

// App module address
const appModule = sdk.getAppModule(
    "0x5d17426b24B692030AB0A009b3226A5F885538Ca",
);

(async() => {
    try {
        const voteModule = await appModule.deployVoteModule({
            // Give your governance contract a name
            name: "SciDAO's Proposals",
            // Our governance token Address
            votingTokenAddress: "0x327E716635170d685a9e92f1A6Ee47D7E054EAc4",
            // after a propsal is created, when can members start voting 
            proposalStartWaitTimeInSeconds: 0,
            // How long do members have to vote on a proposal when it's created?
            // here , you can set it to 24 hours(86400 seconds)
            proposalVotingTimeInSeconds: 24*60*60,
            votingQuorumFraction: 0,

            // What's the minimum # of tokens a user needs to be allowed to create a proposal?
            // I set it to 0, userwith no token can also create proposal
            minimumNumberOfTokensNeededToPropose: "0",
        })
        console.log(
            "✅ Successfully deployed vote module, address:",
            voteModule.address,
        );
    } catch (error) {
        console.error("Failed to deploy vote module",error)
    }
})()

// here deployVoteModule will deploy a brand new voting contract!

