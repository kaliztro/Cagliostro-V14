const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "unlock",
    description: "destranca um canal.",
    userPerms: ['Administrator'], 
	botPerms: ['Administrator'],
    options: [{
        name: `canal`,
        type: 7,
        description: `Canal que será destrancado.`,
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
        canal.permissionOverwrites.create(interaction.guild.id, { 2048: true }) 
        interaction.reply({ content: `Canal destrancado com sucesso. 👍`, ephemeral: true})
        canal.send(`:unlock: este canal foi destrancado!`)
    },
};