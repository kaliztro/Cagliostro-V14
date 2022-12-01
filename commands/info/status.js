
const discord = require("discord.js");
const Schema = require('../../models/Outro');
const config = require(`../../config/config.json`);

module.exports = {
    name: "dstatus",
    description: "Altera o status do bot.",
    usage: `dstatus <aqui>`,
    category: "dono",
    aliases: [`ds`],
    run: async (client, message, args) => {

        const stats = await Schema.findOne({ _id: `outros` });
        const msg = stats?.Status.mensagem

        if(message.author.id != config.donoID) {
          return //message.channel.send(`${message.author}, Tu deve estar doidão né?, só o dono do Bot pode alterar a mensagem de status.`)
        }

        if (!args.length) {
            return message.channel.send(`Meu status atual é: **${msg}**`)
        }

        const Mensagem = args.join(" ")

        await Schema.findOneAndUpdate({ _id: `outros` }, { Status: { mensagem: Mensagem } }, { upsert: true });
        return message.channel.send({ content: `o status foi atualizado para: **${Mensagem}**`, ephemeral: true})


    }
}