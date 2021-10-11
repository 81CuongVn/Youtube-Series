exports.run = async (client, message, args) => {

    if (client.config.removerole.toggle) {

        if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send("❌ You don't have the right perms for this command");

        try {

            let member = await client.convertMember(message.guild, message.mentions.members.first() || args[0])
            let role = await client.convertRole(message.guild, message.mentions.roles.first() || args[1])

            if(!member || !role) return message.channel.send("❌ Not a valid role or member");

            try {

                await member.roles.remove(role)

            } catch (err) {

                console.log(err)
                return message.channel.send("❌ Not enough permissions to remove this role");

            }

            message.channel.send(`✅ <@!${member.id}> has lost the role <@&${role.id}>`);

        } catch (err) {

            return message.channel.send("❌ Please supply all the arguments");

        }

    } else {

        return message.channel.send("❌ Removing a role with the bot isn't enabled")

    }

};

exports.help = {
    name: 'removeRole',
    aliases: ['removerole', 'takerole', 'rrole', 'rremove', 'roleremove'],
    description: 'Take a role from someone.',
    usage: ''
};