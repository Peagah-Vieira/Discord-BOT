module.exports = async (member) => {
    const goodByeEmbed = {
        color: 0xff0000, //VERMELHO
        title: `Adeus`,
        author: {
            name: `${member.user.tag}`,
            icon_url: member.user.avatarURL(),
            url: member.user.avatarURL(),
        },
        description: `Triste! Adeus ${member.user}. Vamos apenas esperar que ele tenha gostado da estadia 😭`,
        image:{
          url: `https://media.tenor.com/bgbgJ8tpK0AAAAAM/dog-crying.gif`,
          height: 0,
          width: 0
        },
        thumbnail: {
          url: `${member.user.displayAvatarURL({
            dynamic: true,
            format: "png",
            size: 1024
          })}`
        },
        footer: {
          text: `ID do usuário: ${member.user.id}`,
        }
    }
    try{
        member.guild.channels.cache.get(process.env.JOINLEAVE_CHAN).send({ 
          embeds: [goodByeEmbed],
        });
    }
    catch (erro){
        console.log(erro);
        member.guild.channels.cache.get(process.env.ERROR_CHAN).send('Ocorreu um erro ao enviar a mensagem de despedida!'); 
    } 
}