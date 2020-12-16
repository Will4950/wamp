const app = require('src/express');
const logger = require('src/logger');
const config = require('src/config');
const events = require('src/events');

const error_404 = function(req, res, next){
    logger.warn('router | 404');
    res.sendStatus(404);
}

app.get('/', (req, res) => {
    res.send('OK');
});

app.post('/', (req, res) => {
    if (req.headers.authorization === config.VERIFICATION_TOKEN) {        
        if (typeof req.body.event != 'undefined'){
            res.status(200).send();            
            logger.debug('router | headers | ' + JSON.stringify(req.headers));
            logger.debug('router | body | ' + JSON.stringify(req.body));  
            events(req.body);
        } else {
            res.status(400).end('Bad Request');
            logger.error('router | invalid post request');
        }
    } else {
        res.status(403).end('Forbidden');
        logger.error('router | invalid authorization');
    }
  
});

app.post('/trigger', (req, res) => {
    if (req.headers.authorization === config.TRIGGER_AUTH) { 
        res.status(200).send();            
        logger.debug('trigger | headers | ' + JSON.stringify(req.headers));
        logger.debug('trigger | body | ' + JSON.stringify(req.body));  
        events(req.body);
    } else {
        res.status(403).end('Forbidden');
        logger.error('trigger | invalid authorization');
    }
});


app.use(error_404);


