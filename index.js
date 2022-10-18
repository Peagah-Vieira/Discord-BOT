require('dotenv').config();
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { loadEvents } = require("./handler/loadEvents");
const { loadCommands } = require("./handler/loadCommands");
const { Player } = require("discord-player");
const { loadPlayerEvents } = require('./handler/loadPlayerEvents');
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
const player = new Player(client);
client.commands = new Collection();

loadCommands(client);
loadEvents(client);
loadPlayerEvents(player);

client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.guild) {
    return;
  }
  if (!client.application?.owner) {
    await client.application?.fetch();
  }
  if (message.content === '!deploy' && message.author.id === client.application?.owner?.id) {
    console.log(message.guild.commands);
    await message.guild.commands.set(client.commands).then(() => {message.reply('Comandos Configurados!')}).catch(err => {
        message.reply('Não foi possível implantar comandos! Certifique-se de que o bot tenha a permissão application.commands!');
        console.error(err);
      });
  }
});

client.on('interactionCreate', async (interaction) => {
  const command = client.commands.get(interaction.commandName.toLowerCase());

  try {
    if (interaction.commandName == 'ban' || interaction.commandName == 'userinfo') {
      command.execute(interaction, client);
    } 
    else {
      command.execute(interaction, player);
    }
  } 
  catch (error) {
      console.error(error);
      interaction.followUp({content: 'Ocorreu um erro ao tentar executar esse comando!'});
  }
});

client.login(process.env.BOT_TOKEN);