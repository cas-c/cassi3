const { RichEmbed } = require('discord.js');
const moment = require('moment');

const serverInfo = (guild) => {
    return new RichEmbed()
        .setTitle(`Info: ${guild.name} (${guild.nameAcronym})`)
        .setThumbnail(guild.iconURL)
        .addField(`Created on ${moment(guild.createdAt).utc().format('MM/DD/YY')}`, `by ${guild.owner}`, true)
        .addField(`Members as of ${moment(guild.client.readyAt).utc().format('MM/DD/YY')}`, guild.memberCount, true)
        .addField(`Members online`, guild.presences.filterArray(p => p.status === 'online').length)
        .addField('Roles', guild.roles.array().join(' | '))
        .setColor('#84c08b');
};

module.exports = serverInfo;
