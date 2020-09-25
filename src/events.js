const path = require('path');
const fs = require("fs");
const logger = require('src/logger');

const presence_status_updated = require('src/handlers/presence_status_updated');

module.exports = (req) => {
    logger.info('event | processing | ' + req.event);

    if (typeof req.payload != 'undefined'){
        switch(req.event){
            case 'user.presence_status_updated':
                if (typeof req.payload.object != 'undefined'){
                    if (typeof req.payload.object.presence_status != 'undefined'){
                        logger.debug('event | ' + req.event + ' | ' + req.payload.object.presence_status);
                        presence_status_updated(req.payload.object.presence_status);
                    } else {
                        logger.error('event | ' + req.event + ' | no payload object presence_status');
                    }
                } else {
                    logger.error('event | ' + req.event + ' | no payload object');
                }
                break;

            default:
                logger.warn('event | no handler | ' + req.event);
        }
    } else {
        logger.error('event | ' + req.event + ' | no payload');
    }

}