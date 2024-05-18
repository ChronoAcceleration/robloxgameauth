const { Events } = require("discord.js")

let botClient = null
let initClient = false

async function userAuthorized(Data) {
    if (!initClient) return


}

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        botClient = client
        initClient = true
    },
    userAuthorized
}