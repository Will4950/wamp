const http = require('http');
const path = require('path');
const config = require('src/config');
const logger = require('src/logger');

module.exports = (data) => {
    
    var options = {
        host: config.HUE_BRIDGE,
        path: '/api/' + config.HUE_TOKEN + '/lights/' + config.HUE_LIGHTID + '/state',
        method: 'PUT', 
        headers: {
            'Content-Type': 'Content-Type: application/json',
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

    var body = JSON.stringify(data);
    req.write(body);
    req.end();
}