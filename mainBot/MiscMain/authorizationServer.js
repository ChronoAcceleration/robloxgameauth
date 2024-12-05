const robloxLongPolling = require("roblox-long-polling")
const { robloxLongPollingPassword } = require("../../configuration.json")
const connectedServersCache = require("./connectedServers")
const { userAuthorized } = require("../Events/onAuthorization")
const { logError, logInfo } = require("../UtilFunctions/logger")

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
        logInfo(`Server connected: ${server.id}`)
    
        server.on("authorization", (data) => {
            try {
                userAuthorized(data)
                logInfo(`User authorized: ${data.userId}`)
            } catch (error) {
                logError(`Error during authorization: ${error.message}`)
            }
        })
    
        server.on("internal_ping", () => {
            return
        })
    
        server.on("error", (error) => {
            connectedServersCache.add(server.id, false) // Set to false for error indication for statistics command.
            logError(`Server error: ${error.message}`)
            return
        })
    
        server.on("disconnect", () => {
            connectedServersCache.remove(server.id)
            logInfo(`Server disconnected: ${server.id}`)
        })
    })

    mainPoll.on("error", (error) => {
        logError(`Polling server error: ${error.message}`)
    })
}

module.exports = {
    startPollingServer
}
