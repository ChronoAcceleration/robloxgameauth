const { SlashCommandBuilder } = require("discord.js");

const functionPath = "./Sub/"
const { sendHelp } = require(functionPath + "helpCommand");
const { sendLinkEmbed } = require(functionPath + "linkCommand")

async function successMessage(interaction) {
    return await interaction.reply({
        content: "`✅`",
        ephemeral: true
    })
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("account")
        .setDescription("Account Commands")
        .addSubcommandGroup(group =>
            group
                .setName("manage")
                .setDescription("Account Management Commands")
                .addSubcommand(subcommand =>
                    subcommand
                        .setName("help")
                        .setDescription("Information on how to link your account"),
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName("link")
                        .setDescription("Link your account to Discord"),
                ),
        ),

    async execute(interaction) {
        // Check Sub Command Groups
        if (interaction.options.getSubcommandGroup() === "manage") {
            if (interaction.options.getSubcommand() === "help") {
                sendHelp(interaction)
            } else if (interaction.options.getSubcommand() == "link") {
                sendLinkEmbed(interaction)
            }
        }

        successMessage(interaction)
    }
};
