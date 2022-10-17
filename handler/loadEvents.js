const clientEvent = (event) => require(`../events/client/${event}`);
const guildEvent = (event) => require(`../events/guild/${event}`);

function loadEvents(client){
  // Clients Events
  client.once("ready", () => clientEvent("ready")(client));
  client.once("reconnecting", () => clientEvent("reconnecting")(client));
  client.once("disconnect", () => clientEvent("disconnect")(client));

  // Guild events
  client.on("guildMemberAdd", (member) => guildEvent("guildMemberAdd")(member));
  client.on("guildMemberRemove", (member) => guildEvent("guildMemberRemove")(member));
}

module.exports = {
    loadEvents,
}