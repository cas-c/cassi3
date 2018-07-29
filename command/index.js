const booru = require('./booru');
const info = require('./info');
const rules = require('./rules');
const serverInfo = require('./serverInfo');
const stats = require('./stats');
const horoscope = require('./horoscope');
const { notification, fp } = require('../util');
const config = require('../config');

const getInfo = (message, guild, client, query) => {
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
        if (query === undefined) {
            user = message.member;
        } else {
            let search = guild.members.get(query);
            if (search === undefined) {
                search = guild.members.find('username', query);
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

const command = (text, message, client) => {
    const guild = client.guilds.find(id => config.discord.guild);
    const params = text.split(' ');
    return fp.switchF({
        'booru': async () => await booru(message),
        'info': () => getInfo(message, guild, client, params[1]),
        'horoscope': () => horoscope(message),
        'notification': () => notification(message),
        'rules': () => rules(),
        'server': () => serverInfo(message.guild),
        'stats': () => stats(message, client)
    })('This is not a valid command.')(params[0]);
};

module.exports = command;
