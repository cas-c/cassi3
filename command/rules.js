const config = require('../config');

const rules = () => {
    return config.discord.rulesURL;
};

module.exports = rules;
