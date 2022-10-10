const helpEmbed = {
	color: 0x0099ff,
	title: 'Gasparzinho',
	url: 'https://github.com/Peagah-Vieira',
	author: {
		name: 'Peagah',
		icon_url: 'https://avatars.githubusercontent.com/u/105545343?s=400&u=7bdea01d63265349adcf159e74bf7e77160db9f8&v=4',
		url: 'https://github.com/Peagah-Vieira',
	},
	description: 'A tribute to my doggy',
	thumbnail: {
		url: 'https://i.imgur.com/R8lqIvT.png',
	},
	fields: [
		{
			name: 'Commands',
			value: 'Meta commands related to the bot!',
		},
		{
			name: '\u200b',
			value: '\u200b',
			inline: false,
		},
		{
			name: '/play',
			value: 'Play a music from link',
			inline: true,
		},
		{
			name: '/pause',
			value: 'Pause the current session',
			inline: true,
		},
		{
			name: '/leave',
			value: 'Makes me leave the voice channel',
			inline: true,
		},
	],
	image: {
		url: 'https://i.imgur.com/R8lqIvT.png',
	},
	timestamp: new Date().toISOString(),
	footer: {
		text: 'I would like to eat some cookies',
		icon_url: 'https://i.imgur.com/R8lqIvT.png',
	},
};
const voiceChannel = interaction.member.voice.channel;
//const playEmbed = {title:"Brincar", description: `Estou indo latir no canal <#1028480183986049034>!`}

if(!voiceChannel){
	await interaction.reply("You need to be in a channel to execute this command!");
}

else{
	await interaction.reply({ embeds: [playEmbed] });
}