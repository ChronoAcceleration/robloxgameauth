const { EmbedBuilder } = require("discord.js")
const { canDM } = require("../../../UtilFunctions/essential") // Gawd 

const informationEmbed = new EmbedBuilder()
  .setTitle("Link Game")
  .setDescription("Alright pal, this the time eh?\n\n[Game Link](https://roblox.com/home)\n\nI will send you a DM once you've completed on-screen instructions on the Roblox place. Make sure you type it out correctly!\nRemember, **you can always unlink.**")
  .setColor("#454fbf")
  .setFooter({
    text: "Insights Squared",
  })
  .setTimestamp();

async function sendLinkEmbed(interaction) {
    const user = interaction.user
    const { success, message } = await canDM(user) // 404 == Error, True = Can DM, False = Cant Dm

    if (success === 404) {
        return await interaction.reply({
            content: "Unable to send information to your DM's, this is a discord issue. Try again later?",
            ephemeral: true
        })
    } else if (success === true) {
        return await message.edit({
            content: "Linking Your Account:",
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
    sendLinkEmbed
}