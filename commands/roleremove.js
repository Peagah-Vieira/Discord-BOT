const { PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: 'roleremove',
    description: 'Remova um Cargo de um Usuário',
    options: [
        {
            name: 'usuario',
            type: 6, //'USER' Type
            description: 'O Usuário que você deseja remover um Cargo',
            required: true,
        },
        {
            name: 'cargo',
            type: 8, //'ROLE' Type
            description: 'Cargo que deseja remover.',
            required: true,
        },
    ],
    async execute(interaction){
        const member = interaction.options.getMember('usuario')
        const role = interaction.options.getRole('cargo');

        if(!member.guild.members.me.permissions.has(PermissionFlagsBits.ManageRoles)){
            const permissionErrorEmbed = {
                color: 0xff0000, //VERMELHO
                description: "Ops! Não tenho permissão para adicionar/remover cargos!"
            }
            return void interaction.reply({
                embeds: [permissionErrorEmbed],
                ephemeral: true
            });
        }

        else if(member.guild.members.me.roles.highest.position <= role.position){
            const rolePositionErrorEmbed = {
                color: 0xff0000, //VERMELHO
                description: "Não consigo remover membros desse cargo! Talvez seja um cargo maior que o meu?"
            }
            return void interaction.reply({
                embeds: [rolePositionErrorEmbed],
                ephemeral: true
            });
        }
    
        else if(member.roles.cache.has(role.id)){
            const removeRoleEmbed = {
                color: 0x0ae50a, // VERDE
                description: `**${role}** foi removido de ${member.user}!`
            }
            member.roles.remove(role).then( () =>
            interaction.reply({
                embeds: [removeRoleEmbed],
                ephemeral: true
            }));
        }

        else if(!member.roles.cache.has(role.id)){
            const withoutRoleEmbed = {
                color: 0xff0000, //VERMELHO
                description: `Não foi possivel remover **${role}** de ${member.user}!`
            }
            return void interaction.reply({
                embeds: [withoutRoleEmbed],
                ephemeral: true
            });
        }
    }
}