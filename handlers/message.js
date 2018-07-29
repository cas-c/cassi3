// just return if there is nothing to do, graceful exit of handler
const config = require('../config');
const censored = require('./censorship');
const shilkworm = require('./shilkworm');
const { getHomeChannelFromMessage } = require('../util');
const command = require('../command');

const messageHandler = async message => {
    if (message.author.id === config.discord.id) return;
    if (config.env !== 'dev') {
        if (message.channel.type === 'dm') {
            if (message.cleanContent === 'shilkworm') {
                shilkworm(message);
            }
            return;
        }
        if (message.channel.type !== 'text' || !message.member) return;
        if (censored(message)) return;
    }
    if (message.content.startsWith(config.prefix)) message.channel.send(command(message.content.split(config.prefix)[1], message, message.client));
    // if (message.content.startsWith('$booru ')) message.channel.send(await command('booru', message, message.client));
}

module.exports = messageHandler;
