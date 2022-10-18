module.exports = async (queue) => {
    const queueEndEmbed = {
        color: 0x0ae50a, // VERDE
        description: `Fila finalizada!`
      }
      queue.metadata.send({ 
        embeds: [queueEndEmbed] 
      });
}