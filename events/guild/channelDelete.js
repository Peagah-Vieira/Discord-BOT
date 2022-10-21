module.exports = async(client, channel) => {
    const logChannel = client.channels.cache.get(process.env.CMDLOG_CHAN);
    const channelDeleteEmbed = {
        color: 0xff0000, //VERMELHO
        title: `Canal Deletado`,
        description: `Nome do Canal: **${channel.name}**\nID do Canal: **${channel.id}**\nTipo do Canal: **${channel.type}**`,
        footer: {
            text: `Data: ${channel.createdAt}`,
        }
    }
    logChannel.send({ 
        embeds: [channelDeleteEmbed],
    });
}