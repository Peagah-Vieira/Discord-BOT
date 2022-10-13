module.exports = {
  name: 'help',
  description: 'Mostra o perfil.',
  execute(interaction){
      const helpEmbed = {
          "type": "rich",
          "title": "",
          "description": `Gasparzinho é o cachorro mais fofinho!`,
          "color": 0xbcbdbd, // CINZA
          "fields": [
            {
              "name": `Autor: Peagah#5132`,
              "value": `Instagram: https://www.instagram.com/pea_gah/\nGithub: https://github.com/Peagah-Vieira`
            },
            {
              "name": `Comandos`,
              "value": `Digite /comandos para ver os comandos implementados até o momento!`
            }
          ],
          "timestamp": `2022-10-12T03:00:00.000Z`,
          "thumbnail": {
            "url": `https://i.imgur.com/R8lqIvT.png`,
            "height": 0,
            "width": 0
          },
          "author": {
            "name": `Gasparzinho#4282`,
            "url": `https://github.com/Peagah-Vieira`,
            "icon_url": `https://i.imgur.com/R8lqIvT.png`
          },
          "footer": {
            "text": `Eu gostaria de comer alguns biscoitinhos`,
            "icon_url": `https://i.imgur.com/R8lqIvT.png`
          },
          "url": `https://github.com/Peagah-Vieira`
      }
      return void interaction.reply({
          embeds: [helpEmbed],
        });
  }
}
