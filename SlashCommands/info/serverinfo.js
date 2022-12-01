const { Client, CommandInteraction, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "serverinfo",
  description: "Informação sobre o servidor.",

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */


  run: async (client, interaction, args, config) => {
    const verificationLevels = {
      0: 'Nenhum',
      1: 'Baixa',
      2: 'Média',
      3: 'Alta',
      4: 'Muito alta'
    };

    const explicit = {
      0: 'Desabilitado',
      1: 'Média',
      2: 'Alta',
    };

    const premiumTier = {
      0: `Esse servidor não possui boost. 😥`,
      1: `Nível 1`,
      2: `Nível 2`,
      3: `Nível 3`,
    }

    const regiao = {
      [`en-US`]: `EUA :flag_us: `, [`de`]: `Deutsch `, [`es-ES`]: `Español `, [`fr`]: `Français `, [`hr`]: `Hrvatski `, [`it`]: `Italiano `, [`pl`]: `Polski `, [`ro`]: `Româna `, [`vi`]: `Tieng Viet `, [`cs`]: `Cestina `,
      [`pt-BR`]: `Brasil :flag_br: `, [`da`]: `Dansk `, [`lt`]: `lietuviskai `, [`hu`]: `Magyar `, [`nl`]: `Nederlands `, [`no`]: `Norsk `, [`fi`]: `Suomi `, [`sv-SE`]: `Svenska `, [`tr`]: `Turkçe `, [`el`]: `Ελληνικά `,
      [`bg`]: `български `, [`ru`]: `Русский `, [`uk`]: `Украïнська `, [`hi`]: `हिंदी `, [`th`]: `ไทย `, [`zh-CN`]: `中文 `, [`ja`]: `日本語 `, [`zh-TW`]: `繁體 中文 `, [`ko`]: `한국어 `,
    }

    const date = interaction.guild.createdAt
    const owner = await interaction.guild.fetchOwner();

    const embed = new EmbedBuilder()
      .setColor('#3086c9')
      .setThumbnail(interaction.guild.iconURL())
      .setTitle('🔍 Informações do servidor')
      .addFields(
        {name: '**Nome:**', value: interaction.guild.name, inline: true},
        {name: '**ID:**', value: interaction.guild.id, inline: true},
        {name: '**Descrição:**', value: interaction.guild.description || `Servidor não possui descrição`},
        {name: '**Dono(a):**', value:`<@${owner.id}>`},
        {name: '**Região:**', value: regiao[interaction.guild.preferredLocale]},
        {name: '**Canais**', value: `${interaction.guild.channels.cache.size}`, inline: true},
        {name: '**Cargos**', value: `${interaction.guild.roles.cache.size}`, inline: true},
        {name: '**Humanos |**', value: `${interaction.guild.members.cache.filter(member => !member.user.bot).size}`, inline: true},
        {name: '** Bots**', value: `${interaction.guild.members.cache.filter(member => member.user.bot).size}`, inline: true},
        {name: '**Canal de Regras:**', value: `<#${interaction.guild.rulesChannelId}>`},
        {name: 'Nível de boost:', value: `${premiumTier[interaction.guild.premiumTier]}`},
        {name: '**Nível de verificação:**', value: `${verificationLevels[interaction.guild.verificationLevel]}`},
        {name: '**Filtro de conteudo explicito:**', value: `${explicit[interaction.guild.explicitContentFilter]}`},
        {name: '**2FA:**', value: `${verificationLevels[interaction.guild.mfaLevel]}`},
        {name: '**Criado em:**', value: formatDate('DD/MM/YYYY', date)},
      )

      .setTimestamp()

    interaction.reply({ embeds: [embed] })
    .catch((err) => console.log(`erro ${err}`))
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