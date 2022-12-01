const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "lock",
    description: "tranca um canal.",
    userPerms: ['Administrator'], 
	botPerms: ['Administrator'],
    options: [{
        name: `canal`,
        type: 7,
        description: `Canal que será trancado.`,
        required: true
    }],


    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */


    run: async (client, interaction, args) => {

        const canal = interaction.options.getChannel(`canal`) 

        if (!client.lockit) client.lockit = [];
        canal.permissionOverwrites.create(interaction.guild.id, { 2048: false }) //2048 = SEND_MESSAGES
        interaction.reply({ content: `Canal trancado com sucesso. 👍`, ephemeral: true})
        canal.send(`:lock: este canal foi trancado!`)
    },
};