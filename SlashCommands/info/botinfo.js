const { Client, CommandInteraction, EmbedBuilder } = require("discord.js");

const moment = require('moment');

moment.locale('pt-BR');

module.exports = {
    name: "botinfo",
    description: "Mostra as informações do bot.",


    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */


    run: async (client, interaction, args, config) => {

        let totalSeconds = client.uptime / 1000;
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        let uptime = ` ${days.toFixed()}d ${hours.toFixed()}h ${minutes.toFixed()}m ${seconds.toFixed()}s`;

        const guild = client.guilds.cache.get("545386837846523905");
        const emoji = guild?.emojis.cache.find(emoji => emoji.id === "985287668902531152") || `🖨️`;


        const inline = true
        const botAvatar = client.user.displayAvatarURL()
        const date = client.user.createdAt
        const userName = client.user.username
        const servsize = client.guilds.cache.size
        const usersize = client.users.cache.size
        const status = {
            online: '`🟢` Online',
            offline: '`⚫` Offline',
            idle: '`🟡` Ausente',
            dnd: '`🔴` Não Perturbe'
        }

        const embed = new EmbedBuilder()
        .setColor("3086c9")
        .setThumbnail(botAvatar)
        .setTitle('🤖 Minhas informações')
        .addFields(
            {name: '**Meu nick**', value: userName},
            {name:'**Meu ID**', value: client.user.id},
            {name:'**Meu criador**', value: 'Kaliztro#4988'},
            {name:'**Servidores**', value: `ㅤ🛡 ${servsize}`, inline: true },
            {name:'**Usuários**', value:`ㅤ👥${usersize}`, inline: true },
            {name:'**Estou online há**', value: uptime},
            {name:'**Criado em**', value: formatDate('DD/MM/YYYY', date)},
            {name:'**Host**', value: `${emoji} AWS`},
            {name:'**Status**', value: status[client.user.presence.status]},
            {name:'Me adicione ao seu servidor', value:  "ㅤㅤㅤㅤ[link](https://discord.com/api/oauth2/authorize?client_id=882715660134797342&permissions=0&scope=bot%20applications.commands)in park"}
        )



        interaction.reply({ embeds: [embed] })

    },
};


/**
         * Formata a data passada para o padrão do Brasil.
         * @param {string} template
         * @param {Date=} [date]
         * @return {string}
         */
 function formatDate(template, date) {
    var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
    date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
    return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
        return template.split(specs[i]).join(item)
    }, template)
}