const player = require("../../config/player");

module.exports = {
    name: "now-playing",
    description: "mostra informações sobre a música atual",
    run: async (client, interaction, config) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing)
            return interaction.reply({
                content: "Nenhuma música está sendo reproduzida no momento",
            });

        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();

        return interaction.reply({
            embeds: [
                {
                    title: "Tocando agora",
                    description: `🎶 | **${queue.current.title}**! (\`${perc.progress}%\`)`,
                    fields: [
                        {
                            name: "\u200b",
                            value: progress,
                        },
                    ],
                    color: config.cor,
                    footer: {
                        text: `Na fila por ${queue.current.requestedBy.tag}`,
                    },
                },
            ],
        });
    },
};
