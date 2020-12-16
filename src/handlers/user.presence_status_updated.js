const path = require('path');
const hue = require('src/config').hue;
const logger = require('src/logger');
const hue_put = require('src/modules/hue_put');
const chat_post = require('src/modules/chat_post');

module.exports = (payload) => {
    logger.debug('handlers | ' + path.parse(__filename).name + ' | ' + JSON.stringify(payload));
    let data;
    switch (payload.object.presence_status){
        case 'Available':
            data = {on: true, sat: hue.SAT_HIGH, bri: hue.g_BRI, hue: hue.COLOR_GREEN};
            break;
        case 'Away':
            data = {on: true, sat: hue.SAT_HIGH, bri: hue.g_BRI, hue: hue.COLOR_YELLOW};
            break;
        case 'Do_Not_Disturb':
            data = {on: true, sat: hue.SAT_HIGH, bri: hue.g_BRI, hue: hue.COLOR_RED};
            break;
        default:
            data = {on: true, sat: hue.SAT_HIGH, bri: hue.g_BRI, hue: hue.COLOR_WHITE};
    }
    logger.debug('handlers | ' + path.parse(__filename).name + ' | data | ' + JSON.stringify(data));
    hue_put(data);    
    chat_post(payload.object);
}