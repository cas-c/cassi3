const { RichEmbed } = require('discord.js');
const moment = require('moment');

const censorship = require('./censorship');
const emoji = rquire('./emoji');

const notification = message => {
    return new RichEmbed()
        .setTitle('🚨 Funny Alert 🚨')
        .addField('User', message.author + `\n${message.author.username + '#' + message.author.discriminator}`, true)
        .addField('Channel', message.channel + `\n#${message.channel.name}`, true)
        .addField('Message', message.cleanContent)
        .setTimestamp(new Date());
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


// "True" shuffle of an array (Knuth-Fisher-Yates shuffle)
const shuffleArray = array => {
    let currentIndex = array.length;
    let temp;
    let randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random * currentIndex);
        currentIndex -= 1;
        temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }
    return array;
}

module.exports = {
    censorship,
    emoji,
    notification,
    userInfo,
    simpleEmbed,
    shuffleArray
};
