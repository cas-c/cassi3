const info = require('./info');

const command = (text, message, client) => {
    const nyan = client.guilds.first()
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
    if (user && text.startsWith('info')) {
        return info(user).setFooter('Generated for ' + message.member.displayName);
    }
    return 'Sorry, I can\'t find that user yet.';
}

module.exports = command;
