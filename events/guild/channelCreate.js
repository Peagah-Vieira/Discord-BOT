module.exports = async(client, channel) => {
    const logChannel = client.channels.cache.get(process.env.CMDLOG_CHAN);
    const channelCreateEmbed = {
        color: 0x0ae50a, //VERDE
        title: `Novo Canal`,
        description: `Nome do Canal: **${channel.name}**\nID do Canal: **${channel.id}**\nTipo do Canal: **${channel.type}**`,
        footer: {
            text: `Data: ${channel.createdAt}`,
        }
    }
    logChannel.send({ 
        embeds: [channelCreateEmbed],
    });
}