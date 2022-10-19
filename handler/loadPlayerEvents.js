const playerEvent = (event) => require(`../events/player/${event}`);

function loadPlayerEvents(player){
    player.on("botDisconnect", (queue) => playerEvent("botDisconnect")(queue));
    player.on("channelEmpty", (queue) => playerEvent("channelEmpty")(queue));
    player.on("connectionError", (queue, error) => playerEvent("connectionError")(queue, error));
    player.on("error", (queue, error) => playerEvent("error")(queue, error));
    player.on("queueEnd", (queue) => playerEvent("queueEnd")(queue));
    player.on("trackAdd", (queue, track) => playerEvent("trackAdd")(queue, track));
    player.on("trackStart", (queue, track) => playerEvent("trackStart")(queue, track));
}

module.exports = {
    loadPlayerEvents,
}