module.exports = (client) => {
    const channel = client.channels.cache.get(process.env.BOTSTATUS_CHAN);
    channel.send(`Gasparzinho dormiu, na data: **${time()}**.`);
}