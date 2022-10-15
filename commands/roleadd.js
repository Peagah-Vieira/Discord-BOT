const { PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: 'roleadd',
    description: 'Atribua um Cargo à um Usuário',
    options: [
        {
            name: 'usuario',
            type: 6, //'USER' Type
            description: 'O Usuário que você deseja atribuir um Cargo',
            required: true,
        },
        {
            name: 'cargo',
            type: 8, //'ROLE' Type
            description: 'Cargo que deseja atribuir.',
            required: true,
        }
    ],
    async execute(interaction){
        const member = interaction.options.getMember('usuario')
        const cargo = interaction.options.getRole('cargo');

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

        else if(member.guild.members.me.roles.highest.position <= cargo.position){
            const errorEmbed = {
                color: 0xff0000, //VERMELHO
                description: "Não consigo atribuir membros à esse cargo! Talvez seja um cargo maior do que o meu?"
            }
            return void interaction.reply({
                embeds: [errorEmbed],
                ephemeral: true
            });
        }

        else if(member.roles.cache.has(cargo.id)){
            const alreadyRoleEmbed = {
                color: 0xff0000, //VERMELHO
                description: `Não foi possivel atribuir **${cargo}** à ${member.user}!`
            }
            return void interaction.reply({
                embeds: [alreadyRoleEmbed],
                ephemeral: true
            });
        }

        else if(!member.roles.cache.has(cargo.id)){
            const RoleEmbed = {
                color: 0x0ae50a, // VERDE
                description: `**${cargo}** foi atribuido à ${member.user}!`
            }
            member.roles.add(cargo)
            .then( () => 
            interaction.reply({
                embeds: [RoleEmbed],
                ephemeral: true
            }));
        }
    }
}