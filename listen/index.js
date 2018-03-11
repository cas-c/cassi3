const deleteListener = require('./delete');
const join = require('./join');

module.exports = {
    join,
    delete: deleteListener
}