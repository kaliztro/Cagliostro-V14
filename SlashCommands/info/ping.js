const { Client, CommandInteraction, ApplicationCommandType, messageLink } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Mostra o ping do bot",
    type: ApplicationCommandType.ChatInput,
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        await interaction.reply(`**Ping?**`);
        await interaction.editReply(`:ping_pong: **| Pong!**\n Latencia da API: **${Math.round(client.ws.ping)}ms**`)

    },
};



