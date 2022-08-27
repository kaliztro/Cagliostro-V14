const { ApplicationCommandType } = require("discord.js");

module.exports = {
    name: "emoji",
    description: "Envia o emoji escolhido no chat.",
    options: [
        {
            name: 'emoji',
            type: 3,
            description: 'Digite o nome do emoji.',
            required: true
        },
    ],

    run: async (client, interaction, args) => {

        const option = interaction.options.getString('emoji')
       
        let emoji = interaction.guild.emojis.cache.find(emoji => emoji.name === option);

        if (!emoji) {
            return interaction.reply("`" + option + "` **não é um emoji deste servidor.**")
        } else if (emoji.animated === true) {
            interaction.reply(`<a:${option}:${emoji.id}>`);
        } else {
            interaction.reply(`<:${option}:${emoji.id}>`);
        }
    },
};



