const { REST, Routes } = require("discord.js");
const { botClientId, botToken } = require("../../configuration.json");
const fs = require("node:fs");
const path = require("node:path");

const commands = [];
const parentDirectory = path.dirname(__dirname)
const foldersPath = path.join(parentDirectory, "Commands");
const commandFolders = fs.readdirSync(foldersPath);

async function deployCommands() {
	for (const folder of commandFolders) {
		const commandsPath = path.join(foldersPath, folder);
		const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath);
			if ('data' in command && 'execute' in command) {
				commands.push(command.data.toJSON());
			} else {
				console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
			}
		}
	}
	
	const rest = new REST().setToken(botToken);
	
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationCommands(botClientId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
}

module.exports = {deployCommands}