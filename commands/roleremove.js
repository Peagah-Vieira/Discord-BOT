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
        const cargo = interaction.options.getRole('cargo');
        try {
            await member.roles.remove(cargo);
        } 
        catch(error){
            console.log(`Erro: ${error}`);
        }
    }
}