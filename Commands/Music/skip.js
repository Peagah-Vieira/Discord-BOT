const {GuildMember} = require('discord.js');

module.exports = {
  name: 'skip',
  description: 'Pula uma música!',
  async execute(interaction, player) {
    const commandChannel = interaction.guild.channels.cache.get(process.env.COMMANDS_CHAN);

    if(interaction.channel.id == commandChannel.id){
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
      const success = queue.skip();
  
      if(success){
        const currentTrack = queue.current;
        const sucessEmbed = {
          color: 0x0ae50a, // VERDE
          description: `Pulada **${currentTrack}**!`,
        }
        return void interaction.followUp({
          embeds: [sucessEmbed],
        });
      }
      else{
          const errorEmbed = {
            color: 0xff0000, //VERMELHO
            description: 'Algo deu errado!'
          }
          return void interaction.followUp({
            embeds: [errorEmbed],
          });
      }
    }
    
    else{
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
