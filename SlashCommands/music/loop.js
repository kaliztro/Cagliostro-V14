const player = require("../../config/player");
const { QueueRepeatMode } = require("discord-player");
const { Client, CommandInteraction } = require('discord.js')

module.exports = {
    name: "loop",
    description: "Define o modo de loop",
    options: [
        {
            name: "mode",
            type: 4, //INTEGER
            description: "Tipo de loop",
            required: true,
            choices: [
                {
                    name: "Off",
                    value: QueueRepeatMode.OFF
                },
                {
                    name: "Track",
                    value: QueueRepeatMode.TRACK
                },
                {
                    name: "Queue",
                    value: QueueRepeatMode.QUEUE
                },
                {
                    name: "Autoplay",
                    value: QueueRepeatMode.AUTOPLAY
                }
            ]
        }
    ],
    /** 
    * @param {Client} client 
    * @param {CommandInteraction} interaction 
    * @param {String[]} args 
    */
   run: async (client, interaction, args) => {
       const queue = player.getQueue(interaction.guildId);
       if(!queue || !queue.playing) return void interaction.reply({ content: "❌ | Nenhuma música está sendo reproduzida no momento!" });
       const loopMode = interaction.options.get("mode").value;
       const success = queue.setRepeatMode(loopMode);
       const mode = loopMode === QueueRepeatMode.TRACK ? "🔂" : loopMode === QueueRepeatMode.QUEUE ? "🔁" : "▶";
       return void interaction.reply({ content: success ? `${mode} | Modo de loop atualizado!` : "❌ | Não foi possível atualizar o modo de loop!" });
    }
}