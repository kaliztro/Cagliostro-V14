const { Client, CommandInteraction, EmbedBuilder } = require("discord.js");

const moment = require('moment');

moment.locale('pt-BR');

module.exports = {
    name: "userinfo",
    description: "Mostra as informações do usuário.",
    options: [{
        name: 'usuário',
        type: 6,
        description: 'Usuário que vc gostaria de ver o avatar.',
        required: false
    }],


    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */


    run: async (client, interaction, args, config) => {
        const member = interaction.options.getMember("usuário") || interaction.member;

        const activities = member.presence?.activities || [`none`];
        const atividades = {[0]:`Jogando`,[1]:`Transmitindo`,[2]:`Ouvindo`,[3]:`Assistindo`,[4]:`Personalizado`,[5]:`Competindo`};

        if (member.presence?.status === 'online') member.presence.status = '`🟢`Online'; 
        if (member.presence?.status === 'idle') member.presence.status = '`🟡`Ausente';
        if (member.presence?.status === 'dnd') member.presence.status = '`🔴`Não perturbar';

        let status = member.presence?.status || '`⚫`offline' ;

        const embed = new EmbedBuilder()
            .setColor("#3086c9")
            .setTitle(member.user.tag, member.user.displayAvatarURL())
            .setImage(member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
            // .setDescription(activities.map((x, i) => `**${atividades[x.type] || `Sem atividade`}**: ${x.name || "None"} : ${x.details || "None"} : ${x.state || "None"}`).join("\n"))
            .addFields(
                {name: 'Apelido:', value: `${member.nickname || `Esse usuario não possui apelido`}`},
                {name: 'Tag:', value: `#${member.user.discriminator}`},
                {name: 'ID:', value: member.id},
                {name: 'Cargo(s):', value: `<@&${member._roles.join('> <@&')}>`},
                {name: 'Premium desde:', value: moment(member.premiumSinceTimestamp).format('LL')},
                {name: 'Conta criada em:', value: ` ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`},
                {name: 'Juntou-se ao servidor em:', value: moment(member.joinedAt).format('LL LTS')},
                {name: 'Status', value: status}
            )
                console.log(member.presence.activities)
        interaction.reply({ embeds: [embed] })
        .catch(() => interaction.reply({ content: '🛑 Erro ao atribuir o cargo ao usuário!', ephemeral: true }))
    },
};