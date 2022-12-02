const Discord = require("discord.js");
const config = require(`../../config/config.json`);

module.exports = {
  name: "sair",
  category: "dono",
  aliases: [],
  description: "sai do servidor selecionado.",
  usage: `sair e o id do servidor. obs: somente o dono do bot pode usar esse comando.`,
  run: async (client, message, args) => {

    if(message.author.id != config.donoID) {
      return message.channel.send(`${message.author}, Tu deve estar doidão né?, só o dono do Bot pode executar esse comando. \n se quiser que eu saia pede para o Kaliztro#4988`)
    }

const servidor = args.join(" ") 
const guild = client.guilds.cache.get(servidor);

client.guilds.cache.get(servidor).leave() 
message.channel.send(`eu sai do servidor: **${guild.name}** ID: **${servidor}**`);

}
}