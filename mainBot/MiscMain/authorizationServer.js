const robloxLongPolling = require("roblox-long-polling")
const { robloxLongPollingPassword } = require("../../configuration.json")
const connectedServersCache = require("./connectedServers")
const { userAuthorized } = require("../Events/onAuthorization")

let alreadyStarted = false

async function startPollingServer() {
    if (alreadyStarted) {
        return
    }

    alreadyStarted = true

    const mainPoll = new robloxLongPolling({
        port: 4000,
        password: robloxLongPollingPassword
    })
    
    mainPoll.on("connection", (server) => {
        connectedServersCache.add(server.id, true)
    
        server.on("authorization", (data) => {
            userAuthorized(data)
        })
    
        server.on("internal_ping", () => {
            return
        })
    
        server.on("error", (error) => {
            connectedServersCache.add(server.id, false) // Set to false for error indication for statistics command.
            return
        })
    
        server.on("disconnect", () => {
            return connectedServersCache.delete(server.id)
        })
    })
}

module.exports = {
    startPollingServer
}