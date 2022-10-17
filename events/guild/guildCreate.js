module.exports = async (client, guild) => {
    const channel = client.channels.cache.get(process.env.GCREATE_CHAN);
    const joinEmbed = {
      color: 0x0ae50a,
      title: `Entrou no Servidor: ${guild.name}!`,
      description: `ID do Dono: **${guild.ownerId}** \n ID do Servidor: **${guild.id}** \n Membros: **${guild.memberCount}**`,
      footer: {
        text: `Data: ${guild.joinedAt}`,
      }
    }
    client.user.setActivity(`Estou em ${client.guilds.cache.size} servidores`);
    try {
      channel.send({ 
        embeds: [joinEmbed],
      });
    } 
    catch(error){
      console.log(error);
    }    
}