module.exports = async (interaction, client, player) => {
    const command = client.commands.get(interaction.commandName.toLowerCase());

  try {
    if (interaction.commandName == 'ban' || interaction.commandName == 'userinfo') {
      command.execute(interaction, client);
    } 
    else {
      command.execute(interaction, player);
    }
  } 
  catch (error) {
      console.error(error);
      interaction.followUp({content: 'Ocorreu um erro ao tentar executar esse comando!'});
  }
}