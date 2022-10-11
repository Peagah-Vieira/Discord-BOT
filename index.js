const fs = require('fs');
const { Client, Collection, GatewayIntentBits, GuildMember, Message, EmbedBuilder, ConnectionService } = require('discord.js');
const ytdl = require('ytdl-core');
const { Player } = require("discord-player");
const { token } = require('./config.json');
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

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

console.log(client.commands);

const player = new Player(client);

client.once('ready', () => {
    console.log(`Gasparzinho acordou, com ${client.users.cache.size} usuários, em ${client.guilds.cache.size} servidores.`); 
    client.user.setActivity(`Eu estou em ${client.guilds.cache.size} servidores`);
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

client.on('messageCreate', async message => {
    if (message.author.bot || !message.guild) {
      return;
    }
    if (!client.application?.owner) {
      await client.application?.fetch();
    }
    if (message.content === '!deploy' && message.author.id === client.application?.owner?.id) {
      await message.guild.commands
        .set(client.commands)
        .then(() => {
          message.reply('Deployed!');
        })
        .catch(err => {
          message.reply('Could not deploy commands! Make sure the bot has the application.commands permission!');
          console.error(err);
        });
    }
});

player.on("error", (queue, error) => {
    console.log(`[${queue.guild.name}] Erro emitido da fila: ${error.message}`);
});

player.on("connectionError", (queue, error) => {
    console.log(`[${queue.guild.name}] Erro emitido da conexão: ${error.message}`);
});

player.on("trackStart", (queue, track) => {
    const trackStartEmbed = {description: `Começou a tocar **${track.title}** em **${queue.connection.channel.name}** agora!`}
    queue.metadata.send({ embeds: [trackStartEmbed] });
});

player.on("trackAdd", (queue, track) => {
    const trackAddEmbed = {description: `Música **${track.title}** adicionada na fila!!`}
    queue.metadata.send({ embeds: [trackAddEmbed] });
});

player.on("botDisconnect", (queue) => {
    const botDisconnectEmbed = {description: `❌ | Fui desconectado manualmente do canal de voz, limpando a fila!`}
    queue.metadata.send({ embeds: [botDisconnectEmbed] });
});

player.on("channelEmpty", (queue) => {
    const channelEmptyEmbed = {description: `❌ | Ninguém está no canal de voz, saindo...`}
    queue.metadata.send({ embeds: [channelEmptyEmbed] });
});

player.on("queueEnd", (queue) => {
    const queueEndEmbed = {description: `✅ Fila finalizada!`}
    queue.metadata.send({ embeds: [queueEndEmbed] });
});

client.on('interactionCreate', async interaction => {
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