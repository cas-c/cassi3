const Discord = require('discord.js');
const client = new Discord.Client();

const listen = require('./listen');
const handlers = require('./handlers');
const { censorship, getHomeChannelFromGuild, getHomeChannelFromMember, getHomeChannelFromMessage, wordIn } = require('./util');

const config = require('./config');

const TwitchClient = require('./twitch');

client.once('ready', () => {
    console.info(`Logged in as ${client.user.tag}.`);
    const tClient = new TwitchClient(client);
    tClient.connect();
});

client.on('message', handlers.message);

if (config.env !== 'dev') {
    client.on('messageDelete', m => {
        if (wordIn(config.discord.censorship.exemptions, m.author.id)) return;
        getHomeChannelFromMessage(m).send(listen.delete(m));
    });
    client.on('guildMemberAdd', m => getHomeChannelFromMember(m).send(listen.join(m)));
    client.on('guildMemberRemove', m => getHomeChannelFromMember(m).send(listen.part(m)));
    client.on('guildBanAdd', (g, m) => getHomeChannelFromGuild(g).send(listen.ban('add', m)));
    client.on('guildBanRemove', (g, m) => getHomeChannelFromGuild(g).send(listen.ban('remove', m)));
    client.on('disconnect', () => console.warn('Cassi3 disconnected from Discord.'));
    client.on('reconnecting', () => console.warn('Cassi3 reconnecting to Discord.'));
    client.on('error', console.error);
    client.on('warn', console.warn);
}

client.login(config.auth.token);

