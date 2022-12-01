const { Client, CommandInteraction, EmbedBuilder } = require("discord.js");
const ms = require(`ms`);

module.exports = {
    name: 'mutar',
    description: 'Coloca o usuario de castigo.',
    userPerms: ['Administrator'], 
	botPerms: ['Administrator'],
    options: [
        {
            name: 'usuário',
            type: 6,
            description: 'Usuário a ser castigado.',
            required: true
        },
        {
            name: 'tempo',
            type: 3,
            description: 'Tempo do castigo! ex: 50s, 2m, 1h',
            required: true
        },
        {
            name: 'motivo',
            type: 3,
            description: 'Motivo do castigo.',
            required: false
        },
    ],


    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */


    run: async (client, interaction, args, config) => {

        let user = interaction.options.getUser(`usuário`)
        let member = interaction.guild.members.cache.get(user.id)
        let timer = interaction.options.getString(`tempo`)
        let reason = interaction.options.getString('motivo') || `Parece que foi sem motivo.`

        let time = ms(timer)

        const embed = new EmbedBuilder()
        .setTitle(`${user.tag} foi Mutado 🤫`, member.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setDescription(`** Mutado por:** ${interaction.user.username} \n **Motivo:** ${reason} \n **Tempo:** ${timer}`)
        .setColor("#3086c9")
        .setTimestamp()


        member.timeout(time, reason)
        .then(interaction.reply({embeds: [embed]}))

        
    },
};