const Discord = require("discord.js");

const { glob } = require("glob");
const { promisify } = require("util");

const globPromise = promisify(glob);

module.exports = {
    name: "set",
    description: "Adiciona os comandos ao servidor.",
    category: "dono",
    userPerms: ['Administrator'],
	botPerms: ['Administrator'],
    run: async (client, message, args) => {

        const slashCommands = await globPromise(
            `${process.cwd()}/SlashCommands/*/*.js`
        );
    
        const arrayOfSlashCommands = [];
        slashCommands.map((value) => {
            const file = require(value);
            if (!file?.name) return;
            client.slashCommands.set(file.name, file);
    
            if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
            arrayOfSlashCommands.push(file);
        });

        const guilda = message.guild.id

        await client.guilds.cache.get(guilda).commands.set(arrayOfSlashCommands);

        message.react("✅");

    }
}