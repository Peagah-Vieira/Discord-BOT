module.exports = {
  name: 'purge',
  description: 'Apague as últimas mensagens no chat.',
  options: [
    {
      name: 'quantidade',
      type: 4, //'INTEGER' Type
      description: 'O número de mensagens que você deseja excluir. (máximo 100)',
      required: true,
    },
  ],
  async execute(interaction) {
    const deleteCount = interaction.options.get('quantidade').value;

    if (!deleteCount || deleteCount < 2 || deleteCount > 100) {
      return void interaction.reply({
        content: `Forneça um número entre 2 e 100 para o número de mensagens a serem excluídas`,
        ephemeral: true,
      }); 
    }

    const fetched = await interaction.channel.messages.fetch({
      limit: deleteCount,
    });

    interaction.channel.bulkDelete(fetched).then(() => {
      const deletedEmbed = {
        color: 0x0ae50a, // VERDE
        description: 'Mensagens excluídas com sucesso',
      }
      interaction.reply({
        embeds: [deletedEmbed],
        ephemeral: true,
      });
    })
    .catch(error => {
      const notDeletedEmbed = {
        color: 0xff0000, //VERMELHO
        description: `Não foi possível excluir mensagens devido a: ${error}`,
      }
      interaction.reply({
        embeds: [notDeletedEmbed],
        ephemeral: true,
      });
    });
  }
}
