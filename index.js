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
client.on('guildMemberAdd', m => home.send(listen.join(m)));
client.on('guildMemberRemove', m => home.send(listen.part(m)));
client.on('guildBanAdd', (g, m) => home.send(listen.ban('add', m)));
client.on('guildBanRemove', (g, m) => home.send(listen.ban('remove', m)));
client.on('disconnect', () => console.warn('Cassi3 disconnected from Discord.'));
client.on('reconnecting', () => console.warn('Cassi3 reconnecting to Discord.'));
client.on('error', console.error);
client.on('warn', console.warn);

client.login(config.auth.token);
