const fs = require('fs');

module.exports = {
  name: 'comandos',
  description: 'Liste todos os comandos disponíveis.',
  async execute(interaction) {
    const commandChannel = interaction.guild.channels.cache.get(process.env.COMMANDS_CHAN);
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    if(interaction.channel.id == commandChannel.id){
      let str = '';
      for (const file of commandFiles) {
        const command = require(`./${file}`);
        str += `${command.name},`;
      }
      const comandosEmbed = {
        color: 0xbcbdbd, // CINZA
        title: "Comandos Implementados!",
        description: str,
      }
      return void interaction.reply({
        embeds: [comandosEmbed],
      });
    }

    else {
      const wrongChannelEmbed = {
        color: 0xff0000, //VERMELHO
        description: `Não é permitido executar comandos nesse canal!`,
      }
      return void interaction.reply({
        embeds: [wrongChannelEmbed],
        ephemeral: true
      });
    }
  }
}
