const Discord = require('discord.js');
const client = new Discord.Client();

const command = require('./command');
const { censorship } = require('./util');

const config = require('./config');

client.on('ready', () => {
    console.info(`Logged in as ${client.user.tag}.`);
});

client.on('message', m => {
    const exempt = censorship.exemptions(m.author.username);
    const clean = censorship.filtering(m.cleanContent.toLowerCase());

    if (!clean && !exempt) {
        console.log('bad times');
        return;
    }

    if (m.content.startsWith(config.prefix)) {
        const response = command(m.content.split(config.prefix)[1], m, client);
        console.log(response);
        return;
    }
});

client.login(config.auth.token);
