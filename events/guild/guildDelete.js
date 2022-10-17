module.exports = async (client, guild) => {
    const channel = client.channels.cache.get(process.env.GDELETE_CHAN);
    const leaveEmbed = {
      color: 0xff0000,
      title: `Saiu do Servidor: ${guild.name}!`,
      description: `ID do Dono: **${guild.ownerId}** \n ID do Servidor: **${guild.id}** \n Membros: **${guild.memberCount}**`,
      footer: {
        text: `Data: ${guild.joinedAt}`,
      }
    }
    client.user.setActivity(`Estou em ${client.guilds.cache.size} servidores`);
    try {
      channel.send({
        embeds: [leaveEmbed],
      });
    } 
    catch(error){
      console.log(error);
    }
}