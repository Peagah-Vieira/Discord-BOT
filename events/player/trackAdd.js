module.exports = async (queue, track) => {
  const trackAddEmbed = {
    color: 0xbcbdbd, // CINZA
    description: `Música **${track.title}** adicionada na fila!!`,
  }
  queue.metadata.send({
    embeds: [trackAddEmbed],
   });
}