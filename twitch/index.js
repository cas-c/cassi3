const { RichEmbed } = require('discord.js');
const Client = require('twitch-js').client;
const config = require('../config');
const options = config.twitch;
const discordOptions = config.discord;
const { field, wordIn } = require('../util');

const bannedMessage = message => wordIn(config.twitchMod.bannedPhrases, message.toLowerCase());
const timeoutMessage = message => wordIn(config.twitchMod.timeoutPhrases, message.toLowerCase());

class TwitchClient extends Client {
    constructor(discordClient) {
        super(options);
        this.dClient = discordClient;
        this.home = discordClient.channels.get(config.twitchMod.reporting);
        this.on('logon', () => {
            this.home.send('Cassie has logged into Twitch as 0xmildred!');
        })
        this.on('ban', (channel, username, reason) => {
            this.home.send(new RichEmbed({
                fields: [
                    field('Ban', `${username} has been banned.`),
                    field('Reason', reason || 'No reason provided.')
                ]
            }));
        });
        this.on('timeout', (channel, username, reason, duration) => {
            this.home.send(new RichEmbed({
                fields: [
                    field('Timeout', `${username} has been timed out for ${duration} seconds.`),
                    field('Reason', reason || 'No reason provided.')
                ]
            }));
        });
        this.on('reconnect', () => {
            this.home.send('I am trying to reconnect to Twitch...');
        })
        this.on('disconnected', reason => {
            this.home.send(`Help!  I've been disconnected from twitch.  Reason is allegedly: ${reason}`);
        })
        // Experimental
        this.on('raid', ({ channel, raider, viewers, userstate }) => {
            this.home.send(new RichEmbed({
                fields: [
                    field(`Raid`, `${raider} is raiding with ${viewers} viewers.`)
                ]
            }));
        });
        this.on('whisper', (from, userstate, message, self) => {
            if (self) return;
            this.home.send(new RichEmbed({
                fields: [
                    field(`Whisper`, `${from} is messaging 0xmildred.`),
                    field(`Message`, message || 'No message content.')
                ]
            }));
        });
        this.on('message', (channel, userstate, message, self) => {
            if (self) return;
            switch (userstate['message-type']) {
                case 'chat':
                    if (bannedMessage(message)) {
                        this.ban('nyannersz', userstate['username'], `Virus link or banned phrase: ${message}`)
                            .then(({ channel, username, reason }) => {
                                console.log('Auto banned user for virus link in nyannersz.');
                            })
                            .catch(err => console.log(`Tried to ban ${userstate['username']} but was unable to. Reason: ${err}`));
                    }
                    if (timeoutMessage(message)) {
                        this.timeout('nyannersz', userstate['username'], 600, `Disallowed phrase: ${message}.`)
                            .then(({ channel, username, reason }) => {
                                console.log('Timed out user for virus link in nyannersz.');
                            })
                            .catch(err => console.log(`Tried to timeout ${userstate['username']} but was unable to. Reason: ${err}`));
                    }
            }
        })
    }
}


module.exports = TwitchClient;