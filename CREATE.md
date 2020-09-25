# Creating your own event handlers

## Example
Follow along below to learn more about how the application can be extended to handle additional events.  In this example we will add an event handler to print a message to the log when we change our status message.

We are going to add an event handler for [user.personal_notes_updated](https://marketplace.zoom.us/docs/api-reference/webhook-reference/user-events/personal-notes-updated).

### Update [Event Subscriptions](https://marketplace.zoom.us/docs/guides/tools-resources/webhooks#event-subscriptions)

First we need to update our Event Subscriptions.

From the manage section of the Zoom Marketplace , click your Webhook Only application.

Click `Feature` on the left.

Expand `Event Subscriptions` and click the *Pencil* icon next to your event subscription.

Under `Event types`, click the gray circle marked *1 events added*.

Click 'User Activity', then select `User’s personal notes have been updated`.

Click `Done`. Click `Save`

### Create handler.js

Create a new file in [src/handlers](src/handlers) named `user.personal_notes_updated.js`.

Put the following contents in the new file:
```js
const path = require('path');
const logger = require('src/logger');

module.exports = (payload) => {
    logger.debug('handlers | ' + path.parse(__filename).name + ' | ' + payload.object.personal_notes);
}
```

Save the file and restart the Express server.  

### Demo

Change your status message.  You should see an entry reporting the new status message in the console and log.  

Congrats!

## What's what

In our Philips Hue demo, there are 3 main files in use:
1. ```src/events.js```
2. ```src/handlers/user.presence_status_updated.js```
3. ```src/modules/hue_put.js```

### [src/events.js](src/events.js)

This is where we process Webhook events.  You should not need to edit this file.  

### [src/handlers/user.presence_status_updated.js](src/handlers/user.presence_status_updated.js)

This is the code for the user.presence_status_updated event.  Each file should match to a webhook api event.

### [src/modules/hue_put.js](src/modules/hue_put.js)

This is a helper function for interfacing with the Hue Bridge API.  

### Flow

1. http post /
2. [src/routers.js](src/routers.js)
3. [src/events.js](src/events.js)
