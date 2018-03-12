const config = require('../config.json');

const exemptions = username => {
    return config.discord.exemptions.includes(username);
};

const bannedWords = text => config.discord.banned.some(w => text.includes(w));

const warnedWords = text => {
    if (config.discord.false.some(w => text.includes(w))) {
        return false;
    };
    return config.discord.warned.some(w => text.includes(w));
};


module.exports = {
    exemptions,
    bannedWords,
    warnedWords
}