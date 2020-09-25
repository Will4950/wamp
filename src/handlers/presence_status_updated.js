const path = require('path');
const hue = require('src/config').hue;
const logger = require('src/logger');
const hue_put = require('src/modules/hue_put');

module.exports = (state) => {
    logger.debug('handlers | ' + path.parse(__filename).name + ' | ' + state);
    let data;
    switch (state){
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
}