const { ApplicationCommandType } = require("discord.js");

module.exports = {
    type:  ApplicationCommandType.ChatInput,
    name: 'coinflip',
    description: 'Jogo de Cara ou Coroa.',
    options: [
        {
            name: "cara-ou-coroa",
            description: "Escolha Cara ou Coroa.",
            type: 3,
            required: true,
            choices: [
                {
                    name: "Cara",
                    value: "cara"
                },
                {
                    name: "Coroa",
                    value: "coroa"
                },
            ]
        }
    ],

    run: async (client, interaction, args) => {

        let array1 = ["cara", "coroa"];
  
        let rand = Math.floor(Math.random() * array1.length);
      
        const escolha = interaction.options.getString('cara-ou-coroa')

      if (escolha.toLowerCase() == array1[rand]) {
          interaction.reply("Deu **" + array1[rand] + "**, você ganhou!")
        } 
      else if (escolha.toLowerCase() != array1[rand]) {
          interaction.reply("Deu **" + array1[rand] + "**, você perdeu!")
        }

    },
};



