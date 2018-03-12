const ban = require('./ban');
const deleteListener = require('./delete');
const join = require('./join');
const part = require('./part');

module.exports = {
    ban,
    delete: deleteListener,
    join,
    part
}