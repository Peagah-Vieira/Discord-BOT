const { REST, SlashCommandBuilder, Routes,  ApplicationCommandOptionType } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('help').setDescription('Replies with meta commands related to the bot!'),
	new SlashCommandBuilder().setName('play').setDescription('Play a music from link'),
	new SlashCommandBuilder().setName('pause').setDescription('Pause the current session'),
	new SlashCommandBuilder().setName('leave').setDescription('Makes me leave the voice channel'),
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);