const player = require("../../config/player");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "stop",
    description: "para a musica",
    run: async (client, interaction, config) => {

        if (!interaction.member.voice.channel)
            return interaction.reply({
                content: "Por favor, junte-se a um canal de voz primeiro!",
            });

        const queue = await player.createQueue(interaction.guild, {
            metadata: interaction.channel,
        });

        const embed = new EmbedBuilder()
        .setDescription(`**⏹️ ${interaction.user.username} Parou a Música! **`)
        // .setColor(config.cor)

        interaction.reply({ embeds: [embed] });

        if (queue.playing) await queue.stop();
    },
};
