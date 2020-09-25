const config = require('src/config');
const server = require('src/http');
server.listen(config.port, config.host);