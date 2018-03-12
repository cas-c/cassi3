const { userInfo } = require('../util');

const join = user => {
    return userInfo(user, 'Server Departure');
};

module.exports = join;
