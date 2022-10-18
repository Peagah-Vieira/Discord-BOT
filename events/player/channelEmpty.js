module.exports = async (queue) => {
    const channelEmptyEmbed = {
        color: 0xff0000, //VERMELHO
        description: `Ninguém está no canal de voz, saindo...`,
      }
      queue.metadata.send({ 
        embeds: [channelEmptyEmbed],
    });
}