const { Client, CommandInteraction, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "avatar",
            description: "Mostra o seu avatar ou do usuario selecionado.",
            options: [
                {
                    name: 'usuário',
                    type: 6,
                    description: 'Usuário que vc gostaria de ver o avatar.',
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

        const user = interaction.options.getUser('usuário') || interaction.user
        let avatar = user.displayAvatarURL({ dynamic: true, size: 1024})

        const embed = new EmbedBuilder()
        .setColor("#3086c9") 
        .setTitle(`Avatar de ${user.username}`) 
        .setImage(avatar) 
        .setFooter({ text: `• Autor: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() }); 

        interaction.reply({ embeds: [embed]})
    },
};
