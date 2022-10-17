require('dotenv').config();
const fs = require('fs');
const { Client, Collection, GatewayIntentBits, PermissionFlagsBits, time } = require('discord.js');
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
const commandFolders = fs.readdirSync('./commands');
client.commands = new Collection();


client.once('ready', async () => {
  const statusChannel = client.channels.cache.get(process.env.BOTSTATUS_CHAN);
  const eBotChannel = client.channels.cache.get(process.env.ERROR_CHAN);
  const server = client.guilds.cache.get(process.env.GUILD_ID);

  for (const folder of commandFolders){
    const commandsFiles = fs
    .readdirSync(`./Commands/${folder}`)
    .filter((file) => file.endsWith(".js"));
    for (const file of commandsFiles){
      const commands = require(`./Commands/${folder}/${file}`);
      client.commands.set(commands.name, commands);
    }
  }

  const readyEmbed = {
    color: 0x0ae50a, // VERDE
    title: "Gasparzinho Acordou",
    description: ` Presente em: **${client.guilds.cache.size}** servidores \n Data: **${time()}**`,
  }
  server.commands.set(client.commands).then( () => {
    statusChannel.send({ 
      embeds: [readyEmbed],
    });
    client.user.setActivity(`Eu estou em ${client.guilds.cache.size} servidores`);
    console.log('Estou pronto para ser utilizado');
  }).catch( err => {
    console.log(err);
    eBotChannel.send(`Não foi possível implantar comandos! Certifique-se de que o bot tenha a permissão application.commands!`);
  });

});

client.once('reconnecting', () => {
  console.log('Reconnecting!');
});

client.once('disconnect', () => {
  const channel = client.channels.cache.get(process.env.BOTSTATUS_CHAN);
  try {
    channel.send(`Gasparzinho dormiu, na data: **${time()}**.`);
  } 
  catch(error){
    console.log(error);
  }
});

client.on("guildCreate", (guild) => {
  const channel = client.channels.cache.get(process.env.GCREATE_CHAN);
  const joinEmbed = {
    color: 0x0ae50a,
    title: `Entrou no Servidor: ${guild.name}!`,
    description: `ID do Dono: **${guild.ownerId}** \n ID do Servidor: **${guild.id}** \n Membros: **${guild.memberCount}**`,
    footer: {
      text: `Data: ${guild.joinedAt}`,
    }
  }
  client.user.setActivity(`Estou em ${client.guilds.cache.size} servidores`);
  try {
    channel.send({ 
      embeds: [joinEmbed],
    });
  } 
  catch(error){
    console.log(error);
  }
});

client.on("guildDelete", (guild) => {
  const channel = client.channels.cache.get(process.env.GDELETE_CHAN);
  const leaveEmbed = {
    color: 0xff0000,
    title: `Saiu do Servidor: ${guild.name}!`,
    description: `ID do Dono: **${guild.ownerId}** \n ID do Servidor: **${guild.id}** \n Membros: **${guild.memberCount}**`,
    footer: {
      text: `Data: ${guild.joinedAt}`,
    }
  }
  client.user.setActivity(`Estou em ${client.guilds.cache.size} servidores`);
  try {
    channel.send({
      embeds: [leaveEmbed],
    });
  } 
  catch(error){
    console.log(error);
  }
});

client.on("guildMemberAdd", (member) => {

  if(!member.guild.members.me.permissions.has(PermissionFlagsBits.ManageRoles)){
    const errorChannel = member.guild.channels.cache.get(process.env.ERROR_CHAN);
    const permissionErrorEmbed = {
        color: 0xff0000, //VERMELHO
        description: "Ops! Não tenho permissão para adicionar/remover cargos!"
    }

    return void errorChannel.send({
      embeds: [permissionErrorEmbed],
    });
  }

  else if(member.guild.members.me.permissions.has(PermissionFlagsBits.ManageRoles)){
    const role = member.guild.roles.cache.find( (role) => role.name === "Membro");
    const welcomeChannel = member.guild.channels.cache.get(process.env.JOINLEAVE_CHAN);
    const errorChannel = member.guild.channels.cache.get(process.env.ERROR_CHAN);
    const welcomeEmbed = {
        color: 0x0ae50a, // VERDE
        title: `Boas-Vindas`,
        author: {
            name: `${member.user.tag}`,
            icon_url: member.user.avatarURL(),
            url: member.user.avatarURL(),
        },
        description: `${member.user} Boas-Vindas ao Servidor **${member.guild.name}**, você recebeu a tag **${role}**! Não deixe de checar o canal <#1029848897633394742>! 😄`,
        image:{
          url: `https://media4.giphy.com/media/4Zo41lhzKt6iZ8xff9/giphy.gif?cid=ecf05e476lz7l2x4cifar5r8spe3b125fglrg4b7w4z0bb89&rid=giphy.gif&ct=g`,
          height: 0,
          width: 0
        },
        thumbnail: {
          url: `${member.user.displayAvatarURL({
            dynamic: true,
            format: "png",
            size: 1024
          })}`
        },
        footer: {
          text: `ID do usuário: ${member.user.id}`,
        }
    }

    member.roles.add(role).then( () => {
      welcomeChannel.send({ 
        embeds: [welcomeEmbed],
      })
    }).catch( (erro) => {
      errorChannel.send(`Ocorreu o seguinte erro ${erro} ao enviar a mensagem de boas-vindas!`);
    });
  }

}); 

client.on("guildMemberRemove", (member) => {
  const goodByeEmbed = {
    color: 0xff0000, //VERMELHO
    title: `Adeus`,
    author: {
        name: `${member.user.tag}`,
        icon_url: member.user.avatarURL(),
        url: member.user.avatarURL(),
    },
    description: `Triste! Adeus ${member.user}. Vamos apenas esperar que ele tenha gostado da estadia 😭`,
    image:{
      url: `https://media.tenor.com/bgbgJ8tpK0AAAAAM/dog-crying.gif`,
      height: 0,
      width: 0
    },
    thumbnail: {
      url: `${member.user.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 1024
      })}`
    },
    footer: {
      text: `ID do usuário: ${member.user.id}`,
    }
  }
  try{
    member.guild.channels.cache.get(process.env.JOINLEAVE_CHAN).send({ 
      embeds: [goodByeEmbed],
    });
  }
  catch (erro){
    console.log(erro);
    member.guild.channels.cache.get(process.env.ERROR_CHAN).send('Ocorreu um erro ao enviar a mensagem de despedida!'); 
  } 
}); 

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