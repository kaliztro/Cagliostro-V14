const { QueryType } = require("discord-player");
const { EmbedBuilder } = require("discord.js");

const player = require("../../config/player");

module.exports = {
    name: "play",
    description: "toca uma musica",
    options: [
        {
            name: "songtitle",
            description: "titulo da musica",
            type: 3, //STRING
            required: true,
        },
    ],
    run: async (client, interaction, config) => {
        const songTitle = interaction.options.getString("songtitle");

        if (!interaction.member.voice.channel)
            return interaction.reply({
                content: "Por favor, junte-se a um canal de voz primeiro!",
            });

        await interaction.deferReply();

        const searchResult = await player.search(songTitle, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO,
        });

        const queue = await player.createQueue(interaction.guild, {
            metadata: interaction.channel,
        });

        if (!queue.connection)
            await queue.connect(interaction.member.voice.channel);

        searchResult.playlist
            ? queue.addTracks(searchResult.tracks)
            : queue.addTrack(searchResult.tracks[0]);

        if (!queue.playing) await queue.play();

        // "tocando agora"

        const currentTrack = queue.current;

        const tocando = new EmbedBuilder()
            .addFields(
                {name: `Tocando:`, value: currentTrack.title},
                {name: `Compositor:` , value: currentTrack.author },
                {name: `Adicionado por:`, value: currentTrack.requestedBy.tag },
                {name: `Link:`, value: currentTrack.url},
            )
            .setImage(currentTrack.thumbnail)
            // .setColor(config.cor)


            // "adicionado a fila"

            const tracks = queue.tracks.slice(0, 10).map((m, i) => {
                return `${i + 1}. [**${m.title}**](${m.url}) - ${
                    m.requestedBy.tag
                }`;
            });

        const pastel = new EmbedBuilder()
        .setDescription(`🎶 Música adicionada à fila com sucesso!! 🎶`)
        .addFields({name: "Música(s):", value: `${tracks.join("\n")}${
            queue.tracks.length > tracks.length
                ? `\n...${
                      queue.tracks.length - tracks.length === 1
                          ? `${
                                queue.tracks.length - tracks.length
                            } more track`
                          : `${
                                queue.tracks.length - tracks.length
                            } more tracks`
                  }`
                : ""
        } ㅤ`})
        // .setColor(config.cor)

        if (!queue?.playing) await interaction.editReply({ embeds: [tocando] });
        if (queue?.playing) await interaction.editReply({embeds: [pastel] });

        //fim

    },
};
