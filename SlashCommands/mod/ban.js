const { Client, CommandInteraction, ApplicationCommandType, Permissions, EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'ban',
    description: 'Bane um usuário do servidor.',
    type: ApplicationCommandType.ChatInput,
    userPerms: ['Administrator'],
	botPerms: ['Administrator'],
    options: [
        {
            name: 'usuário',
            type: 6,
            description: 'Usuário a ser banido.',
            required: true
        },
        {
            name: 'motivo',
            type: 3,
            description: 'Motivo do banimento.',
            required: false
        }
    ],


    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */


     run: async (client, interaction, args, config) => {

        const user = interaction.options.getUser('usuário')
        if (interaction.user.id === user.id) return interaction.reply({ content: 'Você não pode se banir.', ephemeral: true })

        const reason = interaction.options.getString('motivo') || 'Parece que foi sem motivo.'

        const embed = new EmbedBuilder()
        .setAuthor(`${interaction.user.username} foi o mandante do Ban.`, interaction.user.displayAvatarURL({
            dynamic: true,
            size: 1024
        }) )
        .setThumbnail("")
        .setColor("#3086c9")
        .setDescription(`\n\n**A vítima foi a(o):** \`${user.tag}\` \n**Motivo:**\`${reason}\``) 
        .setImage(user.displayAvatarURL({
            dynamic: true,
            size: 1024
        }))
        .setTimestamp()

        interaction.guild.members.ban(user, { reason: reason })
            .then(() => interaction.reply({ embeds: [embed] }))
            .catch(() => interaction.reply({ content: '🛑 Erro ao banir o usuário!', ephemeral: true }))
    
    },
};