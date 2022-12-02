
const Discord = require("discord.js");

module.exports = {
    name: "unset",
    description: "Remove os comandos do servidor.",
    category: "dono",
    userPerms: ['Administrator'],
	botPerms: ['Administrator'],
    run: async (client, message, args) => {

        const guilda = message.guild.id

        await client.guilds.cache.get(guilda).commands.set([]);
        
        message.react("✅");
        
    }
}