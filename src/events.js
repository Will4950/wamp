const fs = require("fs");
const logger = require('src/logger');
const chat_post = require('src/modules/chat_post');

module.exports = (req) => {
    logger.info('event | processing | ' + req.event);

    if (typeof req.payload != 'undefined'){
        if (typeof req.payload.object != 'undefined'){
            logger.debug('event | ' + req.event + ' | ' + JSON.stringify(req.payload));
            if (fs.existsSync('src/handlers/' + req.event + '.js')){
                require('src/handlers/' + req.event)(req.payload);
            } else {
                logger.warn('event | ' + req.event + ' | no event handler');
            }
        } else {
            logger.error('event | ' + req.event + ' | no payload object');
        }        
    } else if (typeof req.token != 'undefined') {
        chat_post(req);
    } else {
        logger.error('event | ' + req.event + ' | no payload');
    }
}
