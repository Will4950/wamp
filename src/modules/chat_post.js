const http = require('https');
const path = require('path');
const config = require('src/config');
const logger = require('src/logger');

module.exports = (data) => {
    
    var options = {
        host: 'inbots.zoom.us',
        path: '/incoming/hook/' + config.TRIGGER_PATH,
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': config.TRIGGER_TOKEN
        }
    };
    
    var req = http.request(options, function (res) {
        var responseString = "";
    
        res.on("data", function (data) {
            responseString += data;
        });
        res.on("end", function () {
            logger.debug('modules | ' + path.parse(__filename).name + ' | ' + responseString); 
        });
    });

    req.on('error', (err) => {
        logger.error('modules | ' + path.parse(__filename).name + ' | ' + err);
    });

    var body = JSON.stringify(data);
    req.write(body);
    req.end();
}