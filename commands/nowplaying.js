const {GuildMember} = require('discord.js');

module.exports = {
  name: 'nowplaying',
  description: 'Mostra a música que está tocando no momento.',
  async execute(interaction, player) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
      const notChannelVoiceEmbed = {
        color: 0xff0000, //VERMELHO
        description: `Você não está em um canal de voz!`,
      }
      return void interaction.reply({
        embeds: [notChannelVoiceEmbed], 
        ephemeral: true,
      });
    }

    if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId){
      const notSameChannelVoiceEmbed = {
        color: 0xff0000, //VERMELHO
        description: `Você não está no meu canal de voz!`
      }
      return void interaction.reply({
        embeds: [notSameChannelVoiceEmbed], 
        ephemeral: true
      });
    } 

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);

    if (!queue || !queue.playing){
      const musicNotPlayingEmbed = {
        color: 0xff0000, //VERMELHO
        description: 'Nenhuma música está sendo tocada!',
      }
      return void interaction.followUp({
        embeds: [musicNotPlayingEmbed],
      });
    }
      
    const progress = queue.createProgressBar();
    const perc = queue.getPlayerTimestamp();
    const nowPlayingEmbed = {
      color: 0xbcbdbd, // CINZA
      title: 'Tocando Agora',
      description: `🎶 | **${queue.current.title}**! (\`${perc.progress}%\`)`,
      fields: [{
          name: '\u200b',
          value: progress,
        }]
    }
    
    return void interaction.followUp({ 
      embeds: [nowPlayingEmbed],
    });
  }
}
