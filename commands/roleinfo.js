module.exports = {
    name: 'roleinfo',
    description: 'Mostra as informações de um cargo.',
    options: [
      {
        name: 'cargo',
        type: 8, //'ROLE' Type
        description: 'Escolha um cargo.',
        required: true,
      },
    ],
    async execute(interaction) {
        const role = interaction.options.getRole('cargo');
        const rolePermissions = role.permissions.toArray();
        const permissions = new Array;
        try {
            rolePermissions.forEach((permission) => {
                permissions.push(`\n`);
                permissions.push(permission);
            });
            const permissionsEmbed = {
                color: 0xbcbdbd, // CINZA
                title: `Cargo: ${role.name}`,
                description: `Adicionado(s) à: **${role.members.size} pessoa(s)**`,
                fields: [
                    {
                        name: `**Permissões**`,
                        value: `${permissions.join('')}`
                    },
                    {
                        name: "\u200B",
                        value: `${role}`
                    }
                ],
                footer: {
                    text: `Data de Criação • ${role.createdAt}`,
                }
            }
            interaction.reply({
                embeds: [permissionsEmbed],
            });
        } 
        catch (erro){
            const errorEmbed = {
                color: 0xff0000, //VERMELHO
                description: `Ocorreu um erro ao executar o comando!`,
            }
            interaction.reply({
                embeds: [errorEmbed],
                ephemeral: true,
            });
            console.log(erro);
        }
    }
}