module.exports = async (queue, error) => {
    console.log(`[${queue.guild.name}] Erro emitido da conexão: ${error.message}`);
}