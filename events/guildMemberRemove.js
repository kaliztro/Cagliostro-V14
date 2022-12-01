const client = require("../index");
const { EmbedBuilder } = require("discord.js");

const Schema = require('../models/Guilds');

client.on("guildMemberRemove", async (member) => {

    const guildDB = await Schema.findOne({ _id: member.guild.id })

    if (guildDB?.Saida) {
        const welcomeChannel = member.guild.channels.cache.get(guildDB.Saida.canal)

        if (!member.user.bot) {

            let embed = new EmbedBuilder()
                .setColor(client.config.cor)
                .setAuthor(member.user.tag, member.user.displayAvatarURL())
                .setTitle(member.user.username + ' caiu fora')
                .setImage("")
                .setDescription(`**${member.user.username}**, saiu do servidor! :broken_heart:`)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                .setFooter('ID do usuario: ' + member.user.id)
                .setTimestamp();

            welcomeChannel?.send({ embeds: [embed] })
        }

        if (member.user.bot) {
            const guild = await client.guilds.cache.get("545386837846523905");
            const nelson = await guild.emojis.cache.find(emoji => emoji.id === "672897038957936651");

            let botembed = new EmbedBuilder()
                .setColor(client.config.cor)
                .setAuthor(member.user.tag, member.user.displayAvatarURL())
                .setTitle(`${nelson} HA HA`)
                .setImage("")
                .setDescription(`O Bot ${member.user.username} foi expulso 🤣🤣🤣`)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                .setTimestamp();
            welcomeChannel?.send({ embeds: [botembed] })

        }
    }
})