const {GuildMember, ApplicationCommandOptionType } = require('discord.js');
const {QueryType} = require('discord-player');

module.exports = {
  name: 'play',
  description: 'Toque uma música em seu canal!',
  options: [
    {
      name: 'query',
      type: ApplicationCommandOptionType.String,
      description: 'A música que você quer tocar',
      required: true,
    },
  ],
  async execute(interaction, player) {
    try {
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

      const query = interaction.options.getString('query');
      const searchResult = await player.search(query, {
          requestedBy: interaction.user,
          searchEngine: QueryType.AUTO,
        })
        .catch(() => {});

      if (!searchResult || !searchResult.tracks.length){
        const notFoundResultEmbed = {
          color: 0x16dddd,
          description: `Nenhum resultado foi encontrado!`,
        }
        return void interaction.followUp({
          embeds: [notFoundResultEmbed],
        });
      }

      const queue = await player.createQueue(interaction.guild, {
        ytdlOptions: {
				quality: "highest",
				filter: "audioonly",
				highWaterMark: 1 << 30,
				dlChunkSize: 0,
			},
        metadata: interaction.channel,
      });

      try {
        if (!queue.connection){
          await queue.connect(interaction.member.voice.channel);
        } 
      } 
      catch {
        void player.deleteQueue(interaction.guildId);
        const notConnectionVoiceEmbed = {
          color: 0x16dddd,
          description: `Não foi possível participar do seu canal de voz!`,
        }
        return void interaction.followUp({
          embeds: [notConnectionVoiceEmbed],
        });
      }

      const LoadingPlaylistEmbed = {
        color: 0x16dddd,
        description: `⏱ Carregando sua ${searchResult.playlist ? 'playlist' : 'track'}...`,
      }

      await interaction.followUp({
        embeds: [LoadingPlaylistEmbed],
      });

      searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);

      if (!queue.playing){
        await queue.play();
      } 
    }
    catch (error) {
      console.log(error);
      interaction.followUp({
        content: 'Ocorreu um erro ao tentar executar esse comando: ' + error.message,
      });
    }
  }
}
