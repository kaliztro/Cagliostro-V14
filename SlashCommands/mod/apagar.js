const { Client, CommandInteraction, ApplicationCommandType, Permissions } = require("discord.js");

module.exports = {
    name: "apagar",
    description: "Apaga as mensagens de um canal.",
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'ManageMessages',
    options: [
        {
            name: 'quantas',
            type: 10,
            description: 'Número de mensagens à serem excluidas.',
            required: true
        },
        {
            name: `canal`,
            type: 7,
            description: `Devo apagar as mensagens de qual canal?.`,
            required: false
        }
    ],


    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */


    run: async (client, interaction, args) => {
        // if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return interaction.reply({ content: 'É. \n parece que vc não pode usar esse comando. 😂', ephemeral: true })

        // if (!interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return interaction.reply({ content: 'Eu não posso apagar as mensagens. não tenho permissao de gerenciar mensagens', ephemeral: true })

        const deleteCount = parseInt(interaction.options.getNumber('quantas'), 10)

        let canal = interaction.options.getChannel(`canal`) || interaction.channel;

        if (!deleteCount || deleteCount < 1 || deleteCount > 99)
            return interaction.reply({ content: "forneça um número de até **99 mensagens** a serem excluídas", ephemeral: true });

        const fetched = await canal.messages.fetch({
            limit: deleteCount
        });

        canal.bulkDelete(fetched)
            .then(() => interaction.reply({ content: `**${interaction.options.getNumber('quantas')} mensagens limpas!**`, ephemeral: true }))


    },
};