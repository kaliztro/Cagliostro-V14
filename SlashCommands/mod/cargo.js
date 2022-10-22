const { Client, CommandInteraction, ApplicationCommandType, Permissions } = require("discord.js");

module.exports = {
    name: "cargo",
    description: 'Atribui um cargo ao membro selecionado.',
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'ManageRoles',
    options: [
        {
            name: 'usuário',
            type: 6,
            description: 'Usuário para o cargo.',
            required: true
        },
        {
            name: `cargo`,
            type: 8,
            description: `Qual cargo?`,
            required: true
        }
    ],


    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */


    run: async (client, interaction, args) => {

        const role = interaction.options.getRole('cargo');
        const member = interaction.options.getMember('usuário');
        const user = interaction.user

        member.roles.add(role)

         // .then(() => interaction.reply({ content: `Cargo atribuido com sucesso. 👌`, ephemeral: true }))
            .then(() => interaction.reply({ content: `**${user.username}** Atribuiu o cargo ${role} ao ${member}`, ephemeral: false }))
            .catch(() => interaction.reply({ content: '🛑 Erro ao atribuir o cargo ao usuário!', ephemeral: true }))
    
    },
};