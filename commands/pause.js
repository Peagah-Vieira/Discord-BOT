const {GuildMember} = require('discord.js');

module.exports = {
  name: 'pause',
  description:'Pausar a música atual!',
  async execute(interaction, player) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
        const notChannelVoiceEmbed = {description: `Você não está em um canal de voz!`}
        return void interaction.reply({embeds: [notChannelVoiceEmbed], ephemeral: true});
    }

    if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
        const notSameChannelVoiceEmbed = {description: `Você não está no meu canal de voz!`}
        return void interaction.reply({embeds: [notSameChannelVoiceEmbed], ephemeral: true});
    }

    await interaction.deferReply();

    const queue = player.getQueue(interaction.guildId);

    if (!queue || !queue.playing){
        const musicNotPlayingEmbed = {description: '❌ Nenhuma música está sendo tocada!'}
        return void interaction.reply({embeds: [musicNotPlayingEmbed], ephemeral: true});
    }
    const success = queue.setPaused(true);

    if(success){
      const sucessEmbed = {description: '⏸ Pausada!'}
      return void interaction.followUp({embeds: [sucessEmbed]});
    }
    else{
      const errorEmbed = {description: '❌ Algo deu errado!'}
      return void interaction.followUp({embeds: [errorEmbed]});
    }
  }
}
