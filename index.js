const Discord = require('discord.js');
const client = new Discord.Client();

const command = require('./command');
const listen = require('./listen');
const { censorship, notification } = require('./util');

const config = require('./config');
const homeID = config.discord.homeChannel;
let home = null;

client.on('ready', () => {
    console.info(`Logged in as ${client.user.tag}.`);
    home = client.channels.get(homeID);
});

client.on('message', m => {
    if (m.channel.type === 'text') { // in other words, not a DM
        if (!censorship.exemptions(m.author.username)) {
            const bannedWords = censorship.bannedWords(m.cleanContent.toLowerCase());

            if (bannedWords) {
                home.send(notification(m));
                if (m.member.bannable) m.member.ban();
                if (m.deletable) message.delete();
                return;
            }

            const warnedWords = censorship.warnedWords(m.cleanContent.toLowerCase());
            if (warnedWords) {
                home.send(notification(m));
                return;
            }
        }
    }

    if (m.content.startsWith(config.prefix)) {
        const response = command(m.content.split(config.prefix)[1], m, client);
        m.channel.send(response);
        return;
    }
});

client.on('messageDelete', m => {
    if (censorship.exemptions(m.author.username)) return;
    home.send(listen.delete(m));
});
client.on('guildMemberAdd', m => home.send(listen.join(m)));
client.on('guildMemberRemove', m => home.send(listen.part(m)));
client.on('guildBanAdd', (g, m) => home.send(listen.ban('add', m)));
client.on('guildBanRemove', (g, m) => home.send(listen.ban('remove', m)));
client.on('disconnect', () => console.warn('Cassi3 disconnected from Discord.'));
client.on('reconnecting', () => console.warn('Cassi3 reconnecting to Discord.'));
client.on('error', console.error);
client.on('warn', console.warn);

client.login(config.auth.token);
