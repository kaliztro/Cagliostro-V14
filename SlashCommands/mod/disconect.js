const { Client, CommandInteraction, ApplicationCommandType, Permissions, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "disconnect",
    description: 'Desconecta o usuário do canal de voz.',
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'ModerateMembers',
    options: [
        {
            name: 'usuário',
            type: 6,
            description: 'Usuário que vc gostaria de desconectar do canal de voz.',
            required: true
        },
        {
            name: 'motivo',
            type: 3,
            description: 'Motivo da desconexão.',
            required: false
        },
    ],


    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */


    run: async (client, interaction, args) => {

        const cara = interaction.options.getUser('usuário');
        let reason = interaction.options.getString('motivo') || `Motivo não especificado.`

        let user = await interaction.guild.members.fetch(cara);
        let member = interaction.guild.members.cache.get(user.id)

        const embed = new EmbedBuilder()
        .setTitle(`${cara.tag} foi desconectado de um canal de voz 🤫`, member.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setDescription(`** Desconectado por:** ${interaction.user.username} \n **Motivo:** ${reason} `)
        .setColor("#3086c9")
        .setTimestamp()


        user.voice.disconnect() 
        .then(() => interaction.reply({embeds: [embed]}))
        .catch(() => interaction.reply({ content: '🛑 Eu não consigo fazer isso! talvez eu não tenha permissão para tal coisa. ', ephemeral: true }))

    },
};