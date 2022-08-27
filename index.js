const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const mongoose = require("mongoose");

const config = require("./config/config.json");
const chalk = require('chalk');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction]
});

module.exports = client;

// Global Variables
client.commands = new Collection();
client.aliases = new Collection();
client.slashCommands = new Collection();
client.prefix = config.PREFIX;

// Initializing the project

client.login(config.token);

['command', 'slashCommand', 'events'].forEach((handler) => {
  require(`./handlers/${handler}`)(client)
});

// mongoose
const { mongooseConnectionString } = require("./config/config.json")
if (!mongooseConnectionString) return;

mongoose.connect(mongooseConnectionString).then(() => console.log(chalk.red('Database conectada com sucesso!')));



//prefix
client.on("messageCreate", async (message) => {

  const config = require("./config/config.json");
  const PREFIX = config.PREFIX

  const Schema = require("./models/Guilds")

  const guildConfig = await Schema.findOne({ _id: message.guild.id });
  const prefix = guildConfig?.Prefix.prefix ?? PREFIX

  if (
      message.author.bot ||
      !message.guild ||
      !message.content.toLowerCase().startsWith(prefix)
  )
      return;

  const [cmd, ...args] = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);

  const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

  if (!command) return;
  await command.run(client, message, args, config);

});

