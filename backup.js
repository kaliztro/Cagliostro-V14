.addField('**Nome**', interaction.guild.name, true)
.addField('**ID**', interaction.guild.id, true)
.addField(`**Descrição**`, `${interaction.guild.description || `Servidor não possui descrição`}`)
.addField('**Dono(a)**', `${owner}`)
.addField(`**Região:**`, regiao[interaction.guild.preferredLocale])
.addField(`**Canais**`, `${interaction.guild.channels.cache.size}`)
.addField('**Cargos**', `${interaction.guild.roles.cache.size}`)
.addField('**Humanos | Bots**', `${interaction.guild.members.cache.filter(member => !member.user.bot).size} | ${interaction.guild.members.cache.filter(member => member.user.bot).size}`)
.addField(`**Canal de Regras**`, `<#${interaction.guild.rulesChannelId}>`)
.addField('Nível de boost', premiumTier[interaction.guild.premiumTier])
.addField(`**Nível de verificação**`, `${verificationLevels[interaction.guild.verificationLevel]}`)
.addField('**Criado em**', formatDate('DD/MM/YYYY', date))