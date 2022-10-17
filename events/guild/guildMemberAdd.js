const { PermissionFlagsBits } = require("discord.js")

module.exports = async (member) => {
    
    if(!member.guild.members.me.permissions.has(PermissionFlagsBits.ManageRoles)){
        const errorChannel = member.guild.channels.cache.get(process.env.ERROR_CHAN);
        const permissionErrorEmbed = {
            color: 0xff0000, //VERMELHO
            description: "Ops! Não tenho permissão para adicionar/remover cargos!"
        }
    
        return void errorChannel.send({
          embeds: [permissionErrorEmbed],
        });
    }

    else if(member.guild.members.me.permissions.has(PermissionFlagsBits.ManageRoles)){
        const role = member.guild.roles.cache.get(process.env.WELCOME_ROLE);
        const welcomeChannel = member.guild.channels.cache.get(process.env.JOINLEAVE_CHAN);
        const errorChannel = member.guild.channels.cache.get(process.env.ERROR_CHAN);
        const welcomeEmbed = {
            color: 0x0ae50a, // VERDE
            title: `Boas-Vindas`,
            author: {
                name: `${member.user.tag}`,
                icon_url: member.user.avatarURL(),
                url: member.user.avatarURL(),
            },
            description: `${member.user} Boas-Vindas ao Servidor **${member.guild.name}**, você recebeu a tag **${role}**! Não deixe de checar o canal <#1029848897633394742>! 😄`,
            image:{
              url: `https://media4.giphy.com/media/4Zo41lhzKt6iZ8xff9/giphy.gif?cid=ecf05e476lz7l2x4cifar5r8spe3b125fglrg4b7w4z0bb89&rid=giphy.gif&ct=g`,
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
    
        member.roles.add(role).then( () => {
          welcomeChannel.send({ 
            embeds: [welcomeEmbed],
          })
        }).catch( (erro) => {
          errorChannel.send(`Ocorreu o seguinte erro ${erro} ao enviar a mensagem de boas-vindas!`);
        });
    }
}