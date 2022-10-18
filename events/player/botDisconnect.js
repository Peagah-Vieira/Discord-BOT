module.exports = async (queue) => {
    const botDisconnectEmbed = {
        color: 0xff0000, //VERMELHO
        description: `Fui desconectado manualmente do canal de voz, limpando a fila!`,
      }
      queue.metadata.send({ 
        embeds: [botDisconnectEmbed],
      });
}