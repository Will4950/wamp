# Creating your own event handlers

## Example
Follow along below to learn more about how the application can be extended to handle additional events.  In this example we will add an event handler to print a message to the log when we sign in to Zoom.

We are going to add a case for `user.signed_in` in [src/events.js](src/events.js).

Begin by stopping the Express server if running and editing [src/events.js](src/events.js).

Find the switch statement in the middle of the file:
```js
switch(req.event){
    case 'user.presence_status_updated':
        logger.debug('event | ' + req.event + ' | ' + req.payload.object.presence_status);
        presence_status_updated(req.payload.object.presence_status);
        break;
}
```

Let's add our new one for `user.signed_in`:
```js
switch(req.event){
    case 'user.presence_status_updated':
        logger.debug('event | ' + req.event + ' | ' + req.payload.object.presence_status);
        presence_status_updated(req.payload.object.presence_status);
        break;
    case 'user.signed_in'
        logger.debug('event | ' + req.event + ' | ' + req.payload.object.email);
        break;
}
```

Save the file and restart the Express server.  

### Update [Event Subscriptions](https://marketplace.zoom.us/docs/guides/tools-resources/webhooks#event-subscriptions)

From the manage section of the Zoom Marketplace , click your Webhook Only application.

Click `Feature` on the left.

Expand `Event Subscriptions` and click the *Pencil* icon next to your event subscription.

Under `Event types`, click the gray circle marked *1 events added*.

Click 'User Activity', then select `User has signed in`.

Click `Done`. Click `Save`

### Demo

Sign in to the Zoom application.  You should see a debug message in the console and log with your email address.  

Congrats!

## What's what

In our Philips Hue demo, there are 3 main files in use:
1. ```src/events.js```
2. ```src/handlers/presence_status_upadted.js```
3. ```src/modules/hue_put.js```

### [src/events.js](src/events.js)

This is where we process Webhook events.

### [src/handlers/presence_status_updated.js](src/handlers/presence_status_updated.js)

This is the code for the user.presence_status_updated event.

### [src/modules/hue_put.js](src/modules/hue_put.js)

This is a helper function for interfacing with the Hue Bridge API.  

### Flow

1. http post /
2. [src/routers.js](src/routers.js)
3. [src/events.js](src/events.js)
