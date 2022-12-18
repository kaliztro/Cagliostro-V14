const player = require("../../config/player");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "skip",
    description: "pula a musica",
    run: async (client, interaction, args, config) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing)
            return interaction.reply({
                content: "Nenhuma música está sendo reproduzida no momento",
            });

        await queue.skip();

        const embed = new EmbedBuilder()
        .setDescription(`**⏭️ ${interaction.user.username} Pulou a Música! **`)
        // .setColor(config.cor)

        interaction.reply({ embeds: [embed]});
    },
};
