module.exports = async(role) => {
    const logChannel = role.guild.channels.cache.get(process.env.CMDLOG_CHAN);
    const roleDeleteEmbed = {
        color: 0xff0000, //VERMELHO
        title: `Cargo Deletado`,
        description: `Nome do Cargo: **${role.name}**\nID do Cargo: **${role.id}**\nMencionável: **${role.mentionable ? "Sim" : "Não"}**`,
        footer: {
            text: `Data: ${role.createdAt}`,
        }
    }
    logChannel.send({ 
        embeds: [roleDeleteEmbed],
    });
}