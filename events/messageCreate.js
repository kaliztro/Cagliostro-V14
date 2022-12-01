const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js')
const ms = require('ms');
const client = require('..');
const config = require('../config/config.json');
const id = require(`../config/usuarios.json`);

const prefix = client.prefix;
const cooldown = new Collection();

client.on('messageCreate', async message => {
	if(message.author.bot) return;
	if(message.channel.type !== 0) return;
	if(!message.content.startsWith(prefix)) return; 
	const args = message.content.slice(prefix.length).trim().split(/ +/g); 
	const cmd = args.shift().toLowerCase();
	if(cmd.length == 0 ) return;
	let command = client.commands.get(cmd)
	if(!command) command = client.commands.get(client.aliases.get(cmd));
	
	if(command) {
		if(command.cooldown) {
				if(cooldown.has(`${command.name}${message.author.id}`)) return message.channel.send({ content: config.messages["COOLDOWN_MESSAGE"].replace('<duration>', ms(cooldown.get(`${command.name}${message.author.id}`) - Date.now(), {long : true}) ) });
				if(command.userPerms || command.botPerms) {
					if(!message.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
						const userPerms = new EmbedBuilder()
						.setDescription(`🚫 ${message.author}, Você não tem a permissão de \`${command.userPerms}\` para usar esse comando!`)
						.setColor('Red')
						return message.reply({ embeds: [userPerms] })
					}
					if(!message.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
						const botPerms = new EmbedBuilder()
						.setDescription(`🚫 ${message.author}, Eu não tenho a permissão de \`${command.botPerms}\` para usar esse comando!`)
						.setColor('Red')
						return message.reply({ embeds: [botPerms] })
					}
				}

				command.run(client, message, args)
				cooldown.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
				setTimeout(() => {
					cooldown.delete(`${command.name}${message.author.id}`)
				}, command.cooldown);
			} else {
				if(command.userPerms || command.botPerms) {
					if(!message.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
						const userPerms = new EmbedBuilder()
						.setDescription(`🚫 ${message.author}, Você não tem a permissão de \`${command.userPerms}\` para usar esse comando!`)
						.setColor('Red')
						return message.reply({ embeds: [userPerms] })
					}
				
					if(!message.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
						const botPerms = new EmbedBuilder()
						.setDescription(`🚫 ${message.author}, Eu não tenho a permissão de \`${command.botPerms}\` para usar esse comando!`)
						.setColor('Red')
						return message.reply({ embeds: [botPerms] })
					}
			}
			command.run(client, message, args)
		}
	}
});



client.on("messageCreate", async (message) => {
	// menção
    if (!message.guild) return;

    const emoj = client.guilds.cache.get("545386837846523905");
    const emoji = emoj?.emojis.cache.find(emoji => emoji.name === "cagliostro") || `👌`;

    let user = message.author.username
    let frases = [`olá ${user}`,`iai ${user}`, `coé ${user}`, `bah`, `Ué, quem é tu?`, `coé ${user}, pinga eu não!`];

    let rand = frases[Math.floor(Math.random()* frases.length)];

    const menção = message.mentions.users.first()
    if (menção) {
        if (menção.id === `${client.user.id}` && message.author.bot) { return message.channel.send(`Pinga eu não bot 🤬`) };
        if (menção.id === `${client.user.id}` && message.author.id === id.otelo) { return message.channel.send(`Pinga eu não nóia`)};

        if (menção.id === `${client.user.id}`) { return message.channel.send(`${emoji}  ${rand}! Meu prefixo neste servidor é: **/**, Para mais informações utilize:  **/ajuda**`)}
    };

});