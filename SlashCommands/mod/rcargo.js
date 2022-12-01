const { Client, CommandInteraction, Permissions } = require("discord.js");

module.exports = {
    name: 'rcargo',
    description: 'Remove um cargo do membro selecionado.',
    userPerms: ['Administrator'], 
	botPerms: ['Administrator'],
    options: [
        {
            name: 'usuário',
            type: 6,
            description: 'Usuário para remocer o cargo.',
            required: true
        },
        {
            name: 'cargo',
            type: 8,
            description: 'Qual cargo?.',
            required: true
        }
    ],


    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */


    run: async (client, interaction, args, config) => {
    
        const role = interaction.options.getRole('cargo');
        const member = interaction.options.getMember('usuário');
        const user = interaction.user

        member.roles.remove(role)

            .then(() => interaction.reply({ content: `**${user.username}** Removeu o cargo ${role} de ${member}`, ephemeral: false }))
    
    },
};