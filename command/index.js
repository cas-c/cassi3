const info = require('./info');
const stats = require('./stats');

const command = (text, message, client) => {
    const nyan = client.guilds.first();

    if (text.startsWith('stats')) {
        return stats(message, client);
    }

    if (text.startsWith('info')) {
        if (message.channel.type === 'dm') return 'This command is only available in guilds.';
        
        let user = undefined;
        if (message.mentions.members !== {}) {
            // tries to find the member version if there is a mention
            user = message.mentions.members.first();
        } else {
            // tries to find the user version if there is a mention, then creates member
            user = client.guilds.first().members.get(message.mentions.users.first().id);
        }
        if (user === undefined) {
            const query = text.split(' ')[1];
            if (query === undefined) {
                user = message.member;
            } else {
                let search = nyan.members.get(query);
                if (search === undefined) {
                    search = nyan.members.find('username', query);
                    if (!search) {
                        return 'Sorry, I can\'t find that user yet.';
                    }
                }
                user = search;
            }
        }

        if (user) {
            return info(user).setFooter('Generated for ' + message.member.displayName);
        } else {
            return 'Sorry, I can\'t find this user yet.';
        }
    }
}

module.exports = command;
