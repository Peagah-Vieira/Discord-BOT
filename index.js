const { Client, GatewayIntentBits, Message, EmbedBuilder, ConnectionService } = require('discord.js');
const ytdl = require('ytdl-core');
const yts = require('yt-search');
const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, NoSubscriberBehavior, AudioResource, createAudioResource } = require('@discordjs/voice');
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

client.on('interactionCreate', async (interaction, args) => {
	if (!interaction.isChatInputCommand()){
        return;
    } 

	const { commandName } = interaction;

	if (commandName === 'help') {
        const helpEmbed = {
            color: 0x0099ff,
            title: 'Gasparzinho',
            url: 'https://github.com/Peagah-Vieira',
            author: {
                name: 'Peagah',
                icon_url: 'https://avatars.githubusercontent.com/u/105545343?s=400&u=7bdea01d63265349adcf159e74bf7e77160db9f8&v=4',
                url: 'https://github.com/Peagah-Vieira',
            },
            description: 'A tribute to my doggy',
            thumbnail: {
                url: 'https://i.imgur.com/R8lqIvT.png',
            },
            fields: [
                {
                    name: 'Commands',
                    value: 'Meta commands related to the bot!',
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
                {
                    name: '/play',
                    value: 'Play a music from link',
                    inline: true,
                },
                {
                    name: '/pause',
                    value: 'Pause the current session',
                    inline: true,
                },
                {
                    name: '/leave',
                    value: 'Makes me leave the voice channel',
                    inline: true,
                },
            ],
            image: {
                url: 'https://i.imgur.com/R8lqIvT.png',
            },
            timestamp: new Date().toISOString(),
            footer: {
                text: 'I would like to eat some cookies',
                icon_url: 'https://i.imgur.com/R8lqIvT.png',
            },
        };
		await interaction.reply({ embeds: [helpEmbed] });
	}

    else if (commandName === 'play') {
        const voiceChannel = interaction.member.voice.channel;

        if(!voiceChannel){
            await interaction.reply("You need to be in a channel to execute this command!");
        }

        else{
            const voiceConnection = joinVoiceChannel({channelId: voiceChannel.id,guildId: interaction.guildId,adapterCreator: interaction.guild.voiceAdapterCreator,});

            const url = await yts("https://www.youtube.com/watch?v=9IUCayF7Brw").then(x => x.all[0].url);

            let downloadInfo = await ytdl.getInfo(url);

            let stream = await ytdl(downloadInfo.videoDetails.video_url)

            const playEmbed = {title:"Brincar", description: `Playing **[${downloadInfo.videoDetails.title}](${downloadInfo.videoDetails.video_url})** now!`}
           
            const player = createAudioPlayer({ behaviors: NoSubscriberBehavior.Play });

            let resouce = createAudioResource(stream);

            try {
                player.play(resouce);

                voiceConnection.subscribe(player);

                await interaction.reply({ embeds: [playEmbed] });

                player.on(AudioPlayerStatus.Idle, () =>{
                    voiceConnection.destroy();
                });
            }
            catch (e) {
                console.log(e);
                await interaction.reply(`I went through some problems sorry!`);
            }
        }
	}

    else if (commandName === 'pause') {
        const playEmbed = {
            title:"Descanso",
            description: "Parei para beber uma água após latir no canal <#1028480183986049034>!",
    }
		await interaction.reply({ embeds: [playEmbed] });
	}

    else if (commandName === 'leave') {
        const voiceChannel = interaction.member.voice.channel;
        const voiceConnection = joinVoiceChannel({channelId: voiceChannel.id,guildId: interaction.guildId,adapterCreator: interaction.guild.voiceAdapterCreator,});
        const leaveEmbed = {title:"Cochilar",description: `Estou indo tirar um cochilo após ter latido no canal <#${voiceChannel.id}>!`,}
       
        try{
            voiceConnection.destroy();
            await interaction.reply({ embeds: [leaveEmbed] });
        }
        catch(e){
            console.log(e);
            await interaction.reply(`I went through some problems sorry!`); 
        }
	}

	else if (commandName === 'ping') {
		await interaction.reply({ content: 'Pong!', ephemeral: true }); //ephemeral mensagem escondida só para quem digitou
	} 

    else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} 

    else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
});

client.login(token);