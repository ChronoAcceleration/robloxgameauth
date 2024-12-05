const { Events } = require("discord.js");
const { logError, logInfo } = require("../UtilFunctions/logger");

let botClient = null;
let initClient = false;

async function userAuthorized(data) {
    if (!initClient) {
        logError("Client not initialized.");
        return;
    }

    try {
        const user = await botClient.users.fetch(data.userId);
        if (!user) {
            logError(`User with ID ${data.userId} not found.`);
            return;
        }

        const dmChannel = await user.createDM();
        await dmChannel.send(`You have been authorized, ${user.username}!`);
        logInfo(`User ${user.username} has been authorized.`);
    } catch (error) {
        logError(`Error authorizing user: ${error.message}`);
    }
}

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        botClient = client;
        initClient = true;
        logInfo("Client initialized and ready.");
    },
    userAuthorized
};
