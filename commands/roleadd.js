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
        },
    ],
    async execute(interaction){
        const member = interaction.options.getMember('usuario')
        const cargo = interaction.options.getRole('cargo');
        try {
            await member.roles.add(cargo);
        } 
        catch(error){
            console.log(`Erro: ${error}`);
        }
    }
}