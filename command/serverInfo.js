const { RichEmbed } = require('discord.js');
const moment = require('moment');
const config = require('../config.json');

const serverInfo = (guild) => {
    const info = new RichEmbed()
        .setTitle(`Info: ${guild.name} (${guild.nameAcronym})`)
        .setThumbnail(guild.iconURL)
        .addField(`Created on ${moment(guild.createdAt).utc().format('MM/DD/YY')}`, `by ${guild.owner}`, true)
        .addField(`Members as of ${moment(guild.client.readyAt).utc().format('MM/DD/YY')}`, guild.memberCount, true)
        .addField(`Members online`, guild.presences.filterArray(p => p.status === 'online').length, true)
        .addField('Channels', `${guild.channels.filterArray(c => c.type === 'text').length} text, ${guild.channels.filterArray(c => c.type === 'voice').length} voice`, true)
        .addField('Roles', guild.roles.array().length, true)
        .addField('Emoji', guild.emojis.array().length, true)
        .addField('Role names', guild.roles.array().join(' | '))
        .setColor('#84c08b');
    // Nyanners specific stuff
    if (guild.id === config.discord.nyan) {
        info
            .setDescription('Hello! This is the Offishal Nyanners fan discord server!')
            .addField('Rules', `[Google Doc](${config.discord.rulesURL})`, true)
            .addField('Mods', `ping ${guild.roles.filterArray(r => r.name === 'Cool Moms')}`, true)
    }
    return info;
};

module.exports = serverInfo;
