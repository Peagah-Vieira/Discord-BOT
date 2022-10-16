const { ApplicationCommandOptionType } = require('discord.js');

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
  async execute(interaction) {
    const user = interaction.options.getMember('user');
    const userInfoEmbed = {
      color: 0xbcbdbd, // CINZA
      title: `Informação Sobre - ${user.displayName}`,
      fields: [
        {
          name: `Usuario`,
          value: `${user}`,
          inline: true
        },
        {
          name: `Discriminador`,
          value: `${user.user.discriminator}`,
          inline: true
        },
        {
          name: `Apelido`,
          value: user.nickname || 'Nenhum',
          inline: true
        },
        {
          name: `Bot`,
          value: `${user.user.bot}`,
          inline: true
        },
        {
          name: `Cor do Cargo`,
          value: `${user.displayHexColor}`,
          inline: true
        },
        {
          name: `Maior Cargo`,
          value: `${user.roles.highest}`,
          inline: true
        }
      ],
      thumbnail: {
        url: `${user.displayAvatarURL({dynamic: true})}`,
        height: 0,
        witdh: 0
      },
      footer:{
        text: `Data de Entrada: ${user.joinedAt}`
      }
    }
    interaction.reply({
      embeds: [userInfoEmbed],
      ephemeral: true,
    });
  }
}