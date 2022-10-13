const {ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: 'userinfo',
  description: 'Obter informações sobre um usuário.',
  options: [
    {
      name: 'user',
      type: ApplicationCommandOptionType.User,
      description: 'O usuário sobre o qual você deseja obter informações',
      required: true,
    }
  ],
  execute(interaction) {
    const user = interaction.options.getUser('user');

    interaction.reply({
      content: `Nome: ${user.username}, ID: ${user.id}, Avatar: ${user.displayAvatarURL({dynamic: true})}`,
      ephemeral: true,
    });
  }
}