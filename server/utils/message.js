const moment = require('moment');

const generateMessage = (from, text, socketId) => {
  return {
    socketId,
    from,
    text,
    createdAt: moment().valueOf()
  }
};

module.exports = { generateMessage };