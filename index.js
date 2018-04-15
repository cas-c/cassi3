const Discord = require('discord.js');
const client = new Discord.Client();

const listen = require('./listen');
const handlers = require('./handlers');
const { censorship, getHomeChannelFromMember, getHomeChannelFromMessage, wordIn } = require('./util');

const config = require('./config');

client.on('ready', () => {
    console.info(`Logged in as ${client.user.tag}.`);
});

client.on('message', handlers.message);

client.on('messageDelete', m => {
    if (wordIn(config.discord.censorship.exemptions, m.author.id)) return;
    getHomeChannelFromMessage(m).send(listen.delete(m));
});
client.on('guildMemberAdd', m => getHomeChannelFromMember(m).send(listen.join(m)));
client.on('guildMemberRemove', m => getHomeChannelFromMember(m).send(listen.part(m)));
client.on('guildBanAdd', (g, m) => getHomeChannelFromMember(m).send(listen.ban('add', m)));
client.on('guildBanRemove', (g, m) => getHomeChannelFromMember(m).send(listen.ban('remove', m)));
client.on('disconnect', () => console.warn('Cassi3 disconnected from Discord.'));
client.on('reconnecting', () => console.warn('Cassi3 reconnecting to Discord.'));
client.on('error', console.error);
client.on('warn', console.warn);

client.login(config.auth.token);
