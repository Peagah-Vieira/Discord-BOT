const { time } = require("discord.js");

module.exports = (client) => {
    const statusChannel = client.channels.cache.get(process.env.BOTSTATUS_CHAN);
    const eBotChannel = client.channels.cache.get(process.env.ERROR_CHAN);
    const server = client.guilds.cache.get(process.env.GUILD_ID);
    
    const readyEmbed = {
      color: 0x0ae50a, // VERDE
      title: "Gasparzinho Acordou",
      description: ` Presente em: **${client.guilds.cache.size}** servidores \n Data: **${time()}**`,
    }
    server.commands.set(client.commands).then( () => {
      statusChannel.send({ 
        embeds: [readyEmbed],
      });
      client.user.setActivity(`Eu estou em ${client.guilds.cache.size} servidores`);
      console.log('Estou pronto para ser utilizado');
    }).catch( err => {
      console.log(err);
      eBotChannel.send(`Não foi possível implantar comandos! Certifique-se de que o bot tenha a permissão application.commands!`);
    });
}