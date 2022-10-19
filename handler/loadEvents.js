const clientEvent = (event) => require(`../events/client/${event}`);
const guildEvent = (event) => require(`../events/guild/${event}`);

function loadEvents(client, player){
  // Clients Events
  client.once("ready", () => clientEvent("ready")(client));
  client.once("reconnecting", () => clientEvent("reconnecting")(client));
  client.once("disconnect", () => clientEvent("disconnect")(client));
  client.on("messageCreate", (message) => clientEvent("messageCreate")(message));

  // Guild events
  client.on("interactionCreate", (interaction) => guildEvent("interactionCreate")(interaction, client, player));
  client.on("guildCreate", (guild) => guildEvent("guildCreate")(client, guild));
  client.on("guildDelete", (guild) => guildEvent("guildDelete")(client, guild));
  client.on("guildMemberAdd", (member) => guildEvent("guildMemberAdd")(member));
  client.on("guildMemberRemove", (member) => guildEvent("guildMemberRemove")(member));
}

module.exports = {
    loadEvents,
}