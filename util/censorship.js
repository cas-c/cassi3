const config = require('../config.json').discord.censorship;
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

const exemptions = username => {
    return config.exemptions.includes(username);
};

const bannedWords = text => config.banned.some(w => text.includes(w));

const warnedWords = text => {
    if (config.false.some(w => text.includes(w))) {
        return false;
    };
    return config.warned.some(w => text.includes(w));
};


module.exports = {
    exemptions,
    bannedWords,
    warnedWords
}