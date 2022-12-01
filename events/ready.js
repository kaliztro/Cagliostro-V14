const { GatewayIntentBits, ActivityType } = require('discord.js');

const client = require('..');
const chalk = require('chalk');
const Schema = require('../models/Outro');

client.on("ready", () => {

	setInterval(async () => {

        const stats = await Schema.findOne({ _id: `outros` });
        const msg = stats?.Status.mensagem

        client.user.setPresence({
            activities: [{ name: msg, type: ActivityType.Listening }],
            status: 'online',
          });

    }, 15 * 1000)

    console.log(chalk.yellow(`Bot ${client.user.username} logado com sucesso em ${client.guilds.cache.size} servidores.`));

    // config de inicialização

    let server = client.guilds.cache.get(`545386837846523905`);

    let canal = server?.channels.cache.get('847321925189238796');

    // canal?.send({ content: `estou On e o meu Ping é: **${Math.round(client.ws.ping)}ms** ` });

});


