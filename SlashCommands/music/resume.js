const player = require("../../config/player");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "resume",
    description: "retomar a musica atual",
    run: async (client, interaction, config) => {
        const queue = player.getQueue(interaction.guildId);

        queue.setPaused(false);

        const embed = new EmbedBuilder()
        .setDescription(`**▶️ ${interaction.user.username} Retomou a Música! **`)
        // .setColor(config.cor)

        return interaction.reply({ embeds: [embed] });
    },
};
