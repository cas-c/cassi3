const { simpleEmbed } = require('../util');

const join = (type, user) => {
    if (type === 'add') {
        return simpleEmbed(user, 'Banning User');
    } else {
        return simpleEmbed(user, 'Unbanning User');
    }
};

module.exports = join;
