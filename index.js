require('dotenv').config();
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { loadEvents } = require("./handler/loadEvents");
const { loadCommands } = require("./handler/loadCommands");
const { loadPlayerEvents } = require('./handler/loadPlayerEvents');
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
loadEvents(client, player);
loadPlayerEvents(player);

client.login(process.env.BOT_TOKEN);