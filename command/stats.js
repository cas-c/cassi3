const { RichEmbed } = require('discord.js'); 


const plural = (a, p) => {
    return a !== 1 ? p + 's ' : p + ' ';
}

//MIT LICENSE (C) MIKACHU @ SWEDENS.COM
const uptime = s => {
    const day = (s/86400000|0);
    const hour = (s%86400000)/3.6e6|0;
    const min = (s%3.6e6)/6e4|0;
    const sec = (s%6e4)/1000|0;
    return day + plural(day, ' day') + hour + plural(hour, ' hour') + min + plural(min, ' minute') + sec + plural(sec, ' second');
};

const stats = (m, client) => {
    return new RichEmbed()
        .setTitle(':fish: cassi3 stats :fish:')
        .setImage(client.user.displayAvatarURL)
        .setColor(8700043)
        .addField('Uptime', uptime(client.uptime))
        .addField('Usage', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`, true)
        .addField('Ping', `${Math.round(m.client.ping)}ms`, true)
        .addField('Github', 'https://github.com/gloss-water/cassi3')
        .setFooter('Generated for ' + m.member.displayName);
}

module.exports = stats;
