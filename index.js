const fs = require('fs');
const { Client, Collection, GatewayIntentBits, GuildMember, Message, EmbedBuilder, ConnectionService } = require('discord.js');
const ytdl = require('ytdl-core');
const { Player } = require("discord-player");
const { token, activity, activityType } = require('./config.json');
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
const commandFiles = fs.readdirSync('./commands').filter( (file) => file.endsWith('.js'));
client.commands = new Collection();

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log(`Gasparzinho acordou, com ${client.users.cache.size} usuários, em ${client.guilds.cache.size} servidores.`);
    console.log(client.commands);
    client.user.setActivity(`Eu estou em ${client.guilds.cache.size} servidores`);
});

client.once('reconnecting', () => {
  console.log('Reconnecting!');
});

client.once('disconnect', () => {
  console.log('Disconnect!');
});

client.on("guildCreate", (guild) => {
    console.log(`O bot entrou no servidor ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros!`);
    client.user.setActivity(`Estou em ${client.guilds.cache.size} servidores`);
});

client.on("guildDelete", (guild) => {
    console.log(`O bot foi removido do servidor ${guild.name} (id: ${guild.id})!`);
    client.user.setActivity(`Estou em ${client.guilds.cache.size} servidores`);
});

client.on("guildMemberAdd", (member) => {
    const welcomeEmbed = {
        author: {
            name: `${member.user.tag}`,
            icon_url: member.user.avatarURL(),
            url: member.user.avatarURL(),
        },
        description: "Bem-vindo ao Servidor WOWZINHO! Não deixe de ler o <#1028480183986049034>! 😄",
    }
    member.guild.channels.cache.get("1027524936438399038").send({ embeds: [welcomeEmbed] });
}); 

client.on("guildMemberRemove", (member) => {
    const goodByeEmbed = {
        author: {
            name: `${member.user.tag}`,
            icon_url: member.user.avatarURL(),
            url: member.user.avatarURL(),
        },
        description: "Triste! Vamos apenas esperar que eles tenham gostado da estadia 😭​​",
    }
    member.guild.channels.cache.get("1027524936438399038").send({ embeds: [goodByeEmbed] });
}); 

player.on('error', (queue, error) => {
  console.log(`[${queue.guild.name}] Erro emitido da fila: ${error.message}`);
});

player.on('connectionError', (queue, error) => {
  console.log(`[${queue.guild.name}] Erro emitido da conexão: ${error.message}`);
});

player.on('trackStart', (queue, track) => {
  const trackStartEmbed = {
    color: 0x16dddd,
    description: `Começou a tocar **${track.title}** em **${queue.connection.channel.name}** agora!`,
  }
  queue.metadata.send({
    embeds: [trackStartEmbed],
  });
});

player.on('trackAdd', (queue, track) => {
  const trackAddEmbed = {
    color: 0x16dddd,
    description: `Música **${track.title}** adicionada na fila!!`,
  }
  queue.metadata.send({
    embeds: [trackAddEmbed],
   });
});

player.on('botDisconnect', (queue) => {
  const botDisconnectEmbed = {
    color: 0x16dddd,
    description: `❌ | Fui desconectado manualmente do canal de voz, limpando a fila!`,
  }
  queue.metadata.send({ 
    embeds: [botDisconnectEmbed],
  });
});

player.on('channelEmpty', (queue) => {
  const channelEmptyEmbed = {
    color: 0x16dddd,
    description: `❌ | Ninguém está no canal de voz, saindo...`,
  }
  queue.metadata.send({ 
    embeds: [channelEmptyEmbed],
  });
});

player.on('queueEnd', (queue) => {
  const queueEndEmbed = {
    color: 0x16dddd,
    description: `✅ Fila finalizada!`
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

client.login(token);