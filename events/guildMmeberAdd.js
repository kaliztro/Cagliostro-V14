const client = require("../index");
const { EmbedBuilder } = require("discord.js");

const Schema = require('../models/Guilds');

client.on("guildMemberAdd", async (member) => {

    const guildDB = await Schema.findOne({ _id: member.guild.id })

    if (guildDB?.Welcome) {
        const welcomeChannel = member.guild.channels.cache.get(guildDB.Welcome.canal)

        if (!member.user.bot) {

            let embed = new EmbedBuilder()
                .setColor(client.config.cor)
                .setAuthor(member.user.tag, member.user.displayAvatarURL())
                .setTitle(`Boas-vindas`)
                .setImage("https://i.imgur.com/QzfNwIE.gif")
                .setDescription(`**${member.user}**, bem-vindo(a) aos** ${member.guild.name} **! :heart: \n Qualquer duvida sobre os comandos é so digitar **/ajuda**`)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                .setFooter(' ID do usuario: ' + member.user.id)
                .setTimestamp();

            welcomeChannel?.send({ embeds: [embed] })

        }

        if (member.user.bot) {
            let botembed = new EmbedBuilder()
                .setColor(client.config.cor)
                .setAuthor(member.user.tag, member.user.displayAvatarURL())
                .setTitle("ah não, um Bot acabou de entrar. 🤬")
                .setImage("")
                .setDescription(`${member.user} o que vc está fazendo aqui??`)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                .setTimestamp();
            welcomeChannel?.send({ embeds: [botembed] })

        }
    }


 
        let cargo = member.guild.roles.cache.get(guildDB.AutoCargo?.cargo) 

        if (!cargo) return

        member.roles.add(cargo)

    

})