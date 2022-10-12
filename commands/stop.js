const {GuildMember} = require('discord.js');

module.exports = {
  name: 'stop',
  description: 'Para todas as músicas na fila!',
  async execute(interaction, player) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
      const notChannelVoiceEmbed = {
        color: 0x16dddd,
        description: `Você não está em um canal de voz!`,
      }
      return void interaction.reply({
        embeds: [notChannelVoiceEmbed], 
        ephemeral: true,
      });
    }

    if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId){
      const notSameChannelVoiceEmbed = {
        color: 0x16dddd,
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
        color: 0x16dddd,
        description: '❌ Nenhuma música está sendo tocada!',
      }
      return void interaction.followUp({
        embeds: [musicNotPlayingEmbed],
      });
    }
    else{
      queue.destroy();
      const queueDestroyEmbed = {
        color: 0x16dddd,
        description: '🛑 Gasparzinho foi descansar!',
      }
      return void interaction.followUp({
        embeds: [queueDestroyEmbed],
      });
    }
  }
}
