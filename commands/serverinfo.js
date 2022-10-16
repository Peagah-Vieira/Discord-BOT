const { ChannelType } = require('discord.js');

module.exports = {
  name: 'serverinfo',
  description: 'Obter informações/status sobre o servidor',

  async execute(interaction) {
    const server = interaction.guild;
    const channels = interaction.guild.channels.cache;
    const roles = interaction.guild.roles.cache;
    const roleList = new Array();
    try {
      roles.forEach( (role) => {
        roleList.push(role.name);
        roleList.push(`\n`);
      });
      const owner = await server.fetchOwner().then( (owner) => {
        return owner.displayName+"#"+owner.user.discriminator;
     });
      const serverInfoEmbed = {
        color: 0xbcbdbd, // CINZA
        author:{
          name: `${server.name}`,
          icon_url: `${server.iconURL({dynamic: true})}`
        },
        fields: [
          {
            name: `Dono`,
            value: `${owner}`,
            inline: true
          },
          {
            name: `Membros`,
            value: `${server.memberCount}`,
            inline: true
          },
          {
            name: `Cargos`,
            value: `${roles.size}`,
            inline: true
          },
          {
            name: `Canais de Categoria`,
            value: `${channels.filter(channel => channel.type === ChannelType.GuildCategory).size}`,
            inline: true
          },
          {
            name: `Canais de Texto`,
            value: `${channels.filter(channel => channel.type === ChannelType.GuildText).size}`,
            inline: true
          },
          {
            name: `Canais de Voz`,
            value: `${channels.filter(channel => channel.type === ChannelType.GuildVoice).size}`,
            inline: true
          },
          {
            name: `Lista de Cargos`,
            value:  `${roleList.reverse().join('')}`,
            inline: false
          }
        ],
        thumbnail: {
          url: `${server.iconURL({dynamic: true})}`,
          height: 0,
          witdh: 0
        },
        footer:{
          text: `ID: ${server.id} \nData de Criação • ${server.createdAt}`
        }
      }
      return void interaction.reply({
        embeds: [serverInfoEmbed],
        ephemeral: true,
      });
    } 
    catch(error){
      console.log('Ocorreu um erro:' + error);
    }

  }
}