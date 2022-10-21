const clientEvent = (event) => require(`../events/client/${event}`);
const guildEvent = (event) => require(`../events/guild/${event}`);

function loadEvents(client, player){
  // Clients Events
  client.once("ready", () => clientEvent("ready")(client));
  client.once("reconnecting", () => clientEvent("reconnecting")(client));
  client.once("disconnect", () => clientEvent("disconnect")(client));
  client.on("messageCreate", (message) => clientEvent("messageCreate")(message));

  // Guild events
  client.on("interactionCreate", (interaction) => guildEvent("interactionCreate")(client, interaction, player));
  client.on("channelCreate", (channel) => guildEvent("channelCreate")(client, channel));
  client.on("channelDelete", (channel) => guildEvent("channelDelete")(client, channel));
  client.on("roleCreate", (role) => guildEvent("roleCreate")(client, role));
  client.on("roleDelete", (role) => guildEvent("roleDelete")(client, role));
  client.on("guildCreate", (guild) => guildEvent("guildCreate")(client, guild));
  client.on("guildDelete", (guild) => guildEvent("guildDelete")(client, guild));
  client.on("guildMemberAdd", (member) => guildEvent("guildMemberAdd")(member));
  client.on("guildMemberRemove", (member) => guildEvent("guildMemberRemove")(member));
}

module.exports = {
    loadEvents,
}