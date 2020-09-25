const path = require('path');
const logger = require('src/logger');

module.exports = (payload) => {
    logger.debug('handlers | ' + path.parse(__filename).name + ' | ' + payload.object.personal_notes);
}