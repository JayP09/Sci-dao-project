import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule(
    "0x327E716635170d685a9e92f1A6Ee47D7E054EAc4",
);

(async() => {
    try {
        console.log(
            "👀 Roles that exist right now:",
            await tokenModule.getAllRoleMembers()
        );

        // Revoke all the role from your wallet over the ERC-20 contract
        await tokenModule.revokeAllRolesFromAddress(process.env.WALLET_ADDRESS);
        console.log(
            "🎉 Roles after revoking ourselves",
            await tokenModule.getAllRoleMembers()
        );
        console.log("✅ Successfully revoked our superpowers from the ERC-20 contract");
    } catch (error) {
        console.error("Failed to revoke ourselves from the DAO treasury", error);
    }
})()