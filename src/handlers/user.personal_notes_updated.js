const path = require('path');
const logger = require('src/logger');
const chat_post = require('src/modules/chat_post');

module.exports = (payload) => {
    logger.debug('handlers | ' + path.parse(__filename).name + ' | ' + payload.object.personal_notes);
    chat_post(payload.object);
}