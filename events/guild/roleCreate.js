module.exports = async(role) => {
    const logChannel = role.guild.channels.cache.get(process.env.CMDLOG_CHAN);
    const roleCreateEmbed = {
        color: 0x0ae50a, //VERDE
        title: `Cargo Criado`,
        description: `Nome do Cargo: **${role.name}**\nID do Cargo: **${role.id}**\nMencionável: **${role.mentionable ? "Sim" : "Não"}**`,
        footer: {
            text: `Data: ${role.createdAt}`,
        }
    }

    try {
        logChannel.send({ 
            embeds: [roleCreateEmbed],
        });    
    } 
    catch{
        return;
    }
}