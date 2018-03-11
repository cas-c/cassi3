const { RichEmbed } = require('discord.js');
const moment = require('moment');

const info = (user) => {
    return gmInfo(user);
};

const gmInfo = user => {
    return new RichEmbed()
        .setAuthor(user.displayName)
        .setDescription(user.user.username + '#' + user.user.discriminator)
        .addField('Discord ID',  user.id)
        .addField('Created On', moment(user.user.createdAt).utc().format('dddd, MMMM Do YYYY, h:mm:ss a'))
        .addField('Joined On', moment(user.joinedAt).utc().format('dddd, MMMM Do YYYY, h:mm:ss a'))
        .addField('Roles', user.roles.array().join(' '))
        .setColor('#84c08b')
        .setTimestamp(new Date())
        .setThumbnail(user.user.displayAvatarURL)
}

module.exports = info;
