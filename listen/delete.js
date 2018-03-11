const { RichEmbed } = require('discord.js');
// const moment = require('moment');

const deleteListener = message => {
    const user = message.author;
    const content = message.cleanContent ? message.cleanContent : 'No text detected.';
    const fa = message.attachments.first();
    const attachment = fa ? fa.proxyURL ? fa.proxyURL : 'url here' : 'No attachments.';
    const response = new RichEmbed()
        .setTitle(`Message from ${user.username} deleted in #${message.channel.name}.`)
        .setDescription(`Shortcuts: ${user} @ ${message.channel}`)
        .setColor('#84c08b')
        .setTimestamp(new Date())
        //.setThumbnail(us);
    if (message.cleanContent) {
        response.addField('Text', content);
    }
    if (fa) {
        response.addField('Attachment', `[view attachment](${attachment})`)
    }
    return response;
};

module.exports = deleteListener;
