require('dotenv').config();
const { Client, Collection, GatewayIntentBits, PermissionFlagsBits, time } = require('discord.js');
const { loadEvents } = require("./handler/loadEvents");
const { loadCommands } = require("./handler/loadCommands");
const { Player } = require("discord-player");
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

player.on('error', (queue, error) => {
  console.log(`[${queue.guild.name}] Erro emitido da fila: ${error.message}`);
});

player.on('connectionError', (queue, error) => {
  console.log(`[${queue.guild.name}] Erro emitido da conexão: ${error.message}`);
});

player.on('trackStart', (queue, track) => {
  const trackStartEmbed = { 
    color: 0xbcbdbd, // CINZA
    title: "Começou a tocar",
    description: `**${track.title}** - **${track.author} (${track.duration})**`,
    image:{
      url: `${track.thumbnail}`
    },
    footer:{
      text: `Solicitado por: ${track.requestedBy.username}`,
      icon_url: `${track.requestedBy.avatarURL({
        dynamic: true,
        format: "png"
      })}`
    }
  }

  queue.metadata.send({
    embeds: [trackStartEmbed],
  });
});

player.on('trackAdd', (queue, track) => {
  const trackAddEmbed = {
    color: 0xbcbdbd, // CINZA
    description: `Música **${track.title}** adicionada na fila!!`,
  }
  queue.metadata.send({
    embeds: [trackAddEmbed],
   });
});

player.on('botDisconnect', (queue) => {
  const botDisconnectEmbed = {
    color: 0xff0000, //VERMELHO
    description: `Fui desconectado manualmente do canal de voz, limpando a fila!`,
  }
  queue.metadata.send({ 
    embeds: [botDisconnectEmbed],
  });
});

player.on('channelEmpty', (queue) => {
  const channelEmptyEmbed = {
    color: 0xff0000, //VERMELHO
    description: `Ninguém está no canal de voz, saindo...`,
  }
  queue.metadata.send({ 
    embeds: [channelEmptyEmbed],
  });
});

player.on('queueEnd', (queue) => {
  const queueEndEmbed = {
    color: 0x0ae50a, // VERDE
    description: `Fila finalizada!`
  }
  queue.metadata.send({ 
    embeds: [queueEndEmbed] 
  });
});

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