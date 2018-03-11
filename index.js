const Discord = require('discord.js');
const client = new Discord.Client();

const command = require('./command');
const listen = require('./listen');
const { censorship } = require('./util');

const config = require('./config');
const homeID = config.discord.homeChannel;
let home = null;

client.on('ready', () => {
    console.info(`Logged in as ${client.user.tag}.`);
    home = client.channels.get(homeID);
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
        m.channel.send(response);
        return;
    }
});

client.on('messageDelete', m => home.send(listen.delete(m)));

client.login(config.auth.token);
