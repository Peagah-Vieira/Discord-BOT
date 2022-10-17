require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
	intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.MessageContent,
	],
});
const OWNER_ID = process.env.OWNER_ID;

module.exports = {
  name: "shutdown",
  description: "Desligue o bot",
  async execute(interaction){
    if (interaction.user.id === OWNER_ID){
      const destroyBotEmbed = {
        color: 0x0ae50a, // verde
        description: `O bot foi desligado com sucesso!`,
      }
      await interaction.reply({
        content: `Desligando...`
      })
      .then(() => {
        client.destroy();
      });

      interaction.deleteReply();

      interaction.followUp({
        embeds: [destroyBotEmbed],
        ephemeral: true
      });
    }

    else{
      const notOwnerEmbed = {
        color: 0xff0000, //VERMELHO
        description: `Este comando é apenas para desenvolvedores!`,
      }
      interaction.reply({
        embeds: [notOwnerEmbed],
        ephemeral: true
      });
    }
  }
}
