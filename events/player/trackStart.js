module.exports = async (queue, track) => {
  const trackStartEmbed = { 
    color: 0xbcbdbd, // CINZA
    title: "Começou a tocar",
    description: `**${track.title}** - **${track.author} (${track.duration})**`,
    image:{
      url: `${track.thumbnail}`
    },
    footer:{
      text: `Solicitado por: ${track.requestedBy.username}`,
      icon_url: `${track.requestedBy.avatarURL({
        dynamic: true,
        format: "png"
      })}`
    }
  }
  
  queue.metadata.send({
    embeds: [trackStartEmbed],
  });
}