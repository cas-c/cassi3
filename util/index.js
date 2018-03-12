const { RichEmbed } = require('discord.js');
const moment = require('moment');

const exemptions = username => {
    return true;
}

const filtering = text => {
    return text;
}

const userInfo = (user, title) => new RichEmbed()
    .setTitle(title ? title : 'User Information')
    .setDescription(user.user.username + '#' + user.user.discriminator)
    .addField('Discord ID',  user.id)
    .addField('Created On', moment(user.user.createdAt).utc().format('dddd, MMMM Do YYYY, h:mm:ss a'))
    .addField('Joined On', moment(user.joinedAt).utc().format('dddd, MMMM Do YYYY, h:mm:ss a'))
    .addField('Roles', user.roles.array().join(' '))
    .setColor('#84c08b')
    .setTimestamp(new Date())
    .setThumbnail(user.user.displayAvatarURL)

const simpleEmbed = (user, message) => new RichEmbed()
    .setTitle(message)
    .addField('User', user.username + '#' + user.discriminator)
    .setThumbnail(user.displayAvatarURL);

module.exports = {
    censorship: {
        exemptions,
        filtering
    },
    userInfo,
    simpleEmbed
};
