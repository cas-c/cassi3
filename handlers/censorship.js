const { RichEmbed } = require('discord.js');

const censorship = require('../config').discord.censorship;

const { field, getHomeChannelFromMessage, wordIn } = require('../util');

const exempt = id => wordIn(censorship.exemptions, id);
const banned = text => wordIn(censorship.banned, text);
const warned = text => wordIn(censorship.warned, text) && !wordIn(censorship.false, text);
const autoDelete = text => wordIn(censorship.autoDelete, text);

const memberToFieldValue = member => `${member} (${member.user.username}#${member.user.discriminator})`;

const channelToFieldValue = channel => `${channel} (#${channel.name})`;

const firstAttachmentOrNull = attachments => attachments.first() ? { url: attachments.first().url } : null;

const censored = message => {
    if (exempt(message.member.id)) return false;
    const content = message.cleanContent.toLowerCase();
    if (banned(content)) {
        if (message.member.bannable) message.member.ban();
        if (message.deletable) message.delete();
        return true;
    }
    if (warned(content)) {
        const home = getHomeChannelFromMessage(message);
        home.send(new RichEmbed({
            title: '🚨 Funny Alert 🚨',
            color: '16711680',
            fields: [
                field('User', memberToFieldValue(message.member), true),
                field('Channel', channelToFieldValue(message.channel), true),
                field('Message', message.cleanContent)
            ],
            thumbnail: {
                url: message.member.user.displayAvatarURL
            },
            image: firstAttachmentOrNull(message.attachments)
        }));
        return false;
    }
    if (autoDelete(content)) {
        if (message.deletable) message.delete();
        return true;
    }
    return false;
}

module.exports = censored;
