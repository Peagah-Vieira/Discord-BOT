const fs = require('fs');

module.exports = {
  name: 'comandos',
  description: 'Liste todos os comandos disponíveis.',
  execute(interaction) {
    let str = '';
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

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
}
