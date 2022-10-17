function loadCommands(client){
    const fs = require("fs");
    const commandFolders = fs.readdirSync('./Commands');
    
    for (const folder of commandFolders){
        const commandsFiles = fs
        .readdirSync(`./Commands/${folder}`)
        .filter((file) => file.endsWith(".js"));
        for (const file of commandsFiles){
          const commands = require(`../Commands/${folder}/${file}`);
          client.commands.set(commands.name, commands);
        }
    }
}

module.exports = {
    loadCommands,
}