const player = require("../../config/player");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "pause",
    description: "pausa a musica atual",
    run: async (client, interaction, config) => {
        const queue = player.getQueue(interaction.guildId);

        queue.setPaused(true);

        const embed = new EmbedBuilder()
        .setDescription(`**⏸️ ${interaction.user.username} Pausou a Música! **`)
        // .setColor(config.cor)

        return interaction.reply({ embeds: [embed] });
    },
};
