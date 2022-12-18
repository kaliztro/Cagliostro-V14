const player = require("../../config/player");

module.exports = {
    name: "volume",
    description: "Troca ou mostra o volume da musica atual",
    options: [
        {
            name: "percentage",
            description: "porcentagem do volume",
            type: 4, //INTEGER
            required: false,
        },
    ],
    run: async (client, interaction) => {
        const volumePercentage = interaction.options.getInteger("percentage");
        const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing)
            return interaction.reply({
                content: "Atualmente não há nenhuma musica sendo tocada",
            });

        if (!volumePercentage)
            return interaction.reply({
                content: `O volume atual é \`${queue.volume}%\``,
            });

        if (volumePercentage < 0 || volumePercentage > 100)
            return interaction.reply({
                content: "O volume deve estar entre 1 e 100",
            });

        queue.setVolume(volumePercentage);

        return interaction.reply({
            content: `O volume foi definido em \`${volumePercentage}%\``,
        });
    },
};
