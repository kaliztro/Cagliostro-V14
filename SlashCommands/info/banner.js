const { Client, CommandInteraction, EmbedBuilder } = require("discord.js");

const axios = require('axios');

module.exports = {
    name: "banner",
            description: "Mostra o seu banner ou do usuario selecionado.",
            options: [
                {
                    name: 'usuário',
                    type: 6,
                    description: 'Usuário que vc gostaria de ver o banner.',
                    required: false
                }
            ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, config) => {

        const user = interaction.options.getUser('usuário') || interaction.user
        
        axios.get(`https://discord.com/api/users/${user.id}`, {
            headers: {
                Authorization: `Bot ${config.token}`,
            },
        }).then((res) => {
            const {
                banner,
                accent_color
            } = res.data

            if (banner) {
                const extension = banner.startsWith("a_") ? ".gif" : ".png";
                const url = `http://cdn.discordapp.com/banners/${user.id}/${banner}${extension}?size=2048`; // quando o usuario tem baner personalizado 
        
                const embed = new MessageEmbed()
                .setTitle(`${user.tag}`)
                .setImage(url)
                .setColor(accent_color || config.cor);

                interaction.reply({embeds: [embed]})
            } else {
                if (accent_color) {
                    const embed2 = new EmbedBuilder()
                        .setDescription(`<--- Essa é a cor do banner de ${user.tag}.`) // quando o usuario n tem baner mas sim a cor
                        .setColor(accent_color)
                        interaction.reply({embeds: [embed2]})
                } else {
                    interaction.reply(`${user.tag} não possui banner!`) // quando o usuario nao tem baner
                }
            }
        })
       


    },
};
