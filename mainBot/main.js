const { Client, GatewayIntentBits, Collection } = require("discord.js")
const { botToken } = require("../configuration.json")
const { deployCommands } = require("./MiscMain/deploy")
const { startPollingServer } = require("./MiscMain/authorizationServer")

const nodeFs = require("node:fs")
const nodePath = require("node:path")

// Init Client

const setIntents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
]
const client = new Client({ intents: setIntents })
client.commands = new Collection()

// Register Slash Commands

const folderPath = nodePath.join(__dirname, "Commands")
const commandFolders = nodeFs.readdirSync(folderPath)

for (const folder of commandFolders) {
    const commandsPath = nodePath.join(folderPath, folder)
    const commandFiles = nodeFs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

    for (const file of commandFiles) {
        const filePath = nodePath.join(commandsPath, file)
        const command = require(filePath)

        if ("data" in command && "execute" in command) {
            client.commands.set(command.data.name, command)
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
        }
    }
}

// Register Events

client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return

    const command = interaction.client.commands.get(interaction.commandName)
    if (!command) {
        console.warn("No command found with name " + interaction.commandName)
    }

    try {
        await command.execute(interaction)
    } catch (error) {
        console.warn(error)
        await interaction.reply({ content: "There was an error while executing this command, sorry pal!", ephemeral: true })
    }
})

const eventsPath = nodePath.join(__dirname, "Events")
const eventFiles = nodeFs.readdirSync(eventsPath).filter(file => file.endsWith(".js"))

for (const file of eventFiles) {
    const filePath = nodePath.join(eventsPath, file)
    const event = require(filePath)
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(...args))
    }
}

// Login to client once refreshed commands.

deployCommands().then(async () => {
    await startPollingServer()
    client.login(botToken)
})