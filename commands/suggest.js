const Discord = require('discord.js')

exports.run = async (client, message, args) => {

    const suggestionsButtonRow = new Discord.MessageActionRow().addComponents(

        new Discord.MessageButton()
        .setCustomId('suggestion_accept')
        .setLabel('Accept')
        .setStyle('SUCCESS'),

        new Discord.MessageButton()
        .setCustomId('suggestion_deny')
        .setLabel('Deny')
        .setStyle('DANGER')

    );

    if (client.config.suggestion.toggle) {

        if (args) {

            let suggestionEmbed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.username}'s suggested`, message.author.displayAvatarURL())
                .setDescription(`\`\`\`${args.join(" ")}\`\`\``)

            try {

                let channel = client.convertChannel(message.guild, client.config.suggestion.channelid)
                let suggestionMessage = await channel.send({
                    embeds: [suggestionEmbed],
                    components: [
                        suggestionsButtonRow
                    ]
                })

                await suggestionMessage.react('👍')
                await suggestionMessage.react('👎')

            } catch (err) {
                return console.log(err)
            }

        } else {

            return message.channel.send("❌ You can't suggest nothing")

        }

    } else {

        return message.channel.send("❌ Suggestions are not enabled")

    }

};

exports.help = {
    name: 'suggest',
    aliases: ['suggest'],
    description: 'Suggest something.',
    usage: ''
};