const { simpleEmbed } = require('../util');

const join = (type, user) => {
        console.log(type);
    if (type === 'add') {
        console.log(user);
        return simpleEmbed(user, 'Banning User');
    } else {
        return simpleEmbed(user, 'Unbanning User');
    }
};

module.exports = join;
