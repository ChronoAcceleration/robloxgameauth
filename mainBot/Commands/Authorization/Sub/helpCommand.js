const { EmbedBuilder } = require("discord.js")
const { canDM } = require("../../../UtilFunctions/essential") // Gawd 

const informationEmbed = new EmbedBuilder()
  .setTitle("Linking What-Not")
  .setDescription("Linking is done via provided Roblox game to authorize your account details with us. How does it work? Nothing too crazy. We don't steal or take any important information other than:\n\n* UserId\n* Username\n\nAnd we store it on our systems to keep you linked. You can always opt-out and remove your information with a simple command.\n\nWe purely need this information for linking your account to this server for functions such as game-authorization from Discord-Roblox.\n\n**In Short:**\n- We need this information to add you to a whitelist for a Roblox game, that's it.")
  .setColor("#454fbf")
  .setFooter({
    text: "Insights Squared",
  })
  .setTimestamp();

async function sendHelp(interaction) {
    const user = interaction.user
    const { success, message } = await canDM(user) // 404 == Error, True = Can DM, False = Cant Dm

    if (success === 404) {
        return await interaction.reply({
            content: "Unable to send information to your DM's, this is a discord issue. Try again later?",
            ephemeral: true
        })
    } else if (success === true) {
        return await message.edit({
            content: "Hey!",
            embeds: [informationEmbed]
        })
    } else if (success === false) {
        return await interaction.reply({
            content: "Unable to send information to your DM's. Toggle on your DMs for a bit!",
            ephemeral: true
        })
    }
}

module.exports = {
    sendHelp
}
