const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong")
    .setDMPermission(true),
    async execute(interaction) {
        await interaction.reply({
            content: "Pong!",
            ephemeral: true
        })
    }
}