const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js');
const ms = require('ms');
const client = require('..');
// const config = require('../config/config.json');
const config = require(`..`);

const cooldown = new Collection();

client.on('interactionCreate', async interaction => {
	const slashCommand = client.slashCommands.get(interaction.commandName);
		if (interaction.type == 4) {
			if(slashCommand.autocomplete) {
				const choices = [];
				await slashCommand.autocomplete(interaction, choices)
			}
		}
		if (!interaction.type == 2) return;
	
		if(!slashCommand) return client.slashCommands.delete(interaction.commandName);
		try {
			if(slashCommand.cooldown) {
				if(cooldown.has(`slash-${slashCommand.name}${interaction.user.id}`)) return interaction.reply({ content: config.messages["COOLDOWN_MESSAGE"].replace('<duration>', ms(cooldown.get(`slash-${slashCommand.name}${interaction.user.id}`) - Date.now(), {long : true}) ) })
				if(slashCommand.userPerms || slashCommand.botPerms) {
					if(!interaction.memberPermissions.has(PermissionsBitField.resolve(slashCommand.userPerms || []))) {
						const userPerms = new EmbedBuilder()
						.setDescription(`🚫 ${interaction.user}, Você não tem a permissão \`${slashCommand.userPerms}\` para usar esse comando!`)
						.setColor('Red')
						return interaction.reply({ embeds: [userPerms] })
					}
					if(!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || []))) {
						const botPerms = new EmbedBuilder()
						.setDescription(`🚫 ${interaction.user}, Eu não tenho a permissão \`${slashCommand.botPerms}\` para usar esse comando!`)
						.setColor('Red')
						return interaction.reply({ embeds: [botPerms] })
					}

				}

					await slashCommand.run(client, interaction, config);
					cooldown.set(`slash-${slashCommand.name}${interaction.user.id}`, Date.now() + slashCommand.cooldown)
					setTimeout(() => {
							cooldown.delete(`slash-${slashCommand.name}${interaction.user.id}`)
					}, slashCommand.cooldown)
			} else {
				if(slashCommand.userPerms || slashCommand.botPerms) {
					if(!interaction.memberPermissions.has(PermissionsBitField.resolve(slashCommand.userPerms || []))) {
						const userPerms = new EmbedBuilder()
						.setDescription(`🚫 ${interaction.user}, Você não tem a permissão \`${slashCommand.userPerms}\` para usar esse comando!`)
						.setColor('Red')
						return interaction.reply({ embeds: [userPerms] })
					}
					if(!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || []))) {
						const botPerms = new EmbedBuilder()
						.setDescription(`🚫 ${interaction.user}, Eu não tenho a permissão \`${slashCommand.botPerms}\` para usar esse comando!`)
						.setColor('Red')
						return interaction.reply({ embeds: [botPerms] })
					}

				}
				await slashCommand.run(client, interaction, config);
			}
		} catch (error) {
				console.log(error);
		}


		    //button
			if (interaction.isButton()) {

				const guildDB = await Schema.findOne({ _id: interaction.member.guild.id });
		
				let cargo = interaction.member.guild.roles.cache.get(guildDB?.Botao?.cargo) 
		
				if (!cargo) return
		
				let membro = interaction.member
		
				if (interaction.customId === `cargofreegame`){
					
					membro.roles.add(cargo)
					interaction.reply({ content: `Feitoria`, ephemeral: true})
				}
		
				if (interaction.customId === `removercargofreegame`){
					
					membro.roles.remove(cargo)
					interaction.reply({ content: `removido`, ephemeral: true})
				}
		
			}
			

});