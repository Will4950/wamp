# Will's Alert Management Program! (WAMP!)

Will's Alert Management Program! (WAMP!) is a node.js express application Zoom Webhooks events handler.  This is a simple app that demonstrates how easy it is to use Zoom Webhooks to fire off events.

# Getting Started

These instructions will get you a copy of the project up and running on your local machine.  The current demo uses the user.presence_status_updated event to change the color of a Philips Hue lamp.  This code could be easily expanded to include more events.

**Prerequisites:**
* [Zoom account](https://zoom.us)
* [Zoom Marketplace Account](https://marketplace.zoom.us/docs/guides)
* [Node.js 8+](https://nodejs.org/)
* [Philips Hue Bridge](https://www.philips-hue.com/en-us/p/hue-bridge/046677458478)

## Setup app locally

Assuming macOS 10.15+.

Clone and install the app and it's dependencies. We'll be using [Express](https://www.npmjs.com/package/express) for a basic Node.js server, [dotenv](https://www.npmjs.com/package/dotenv) for our credentials, and [winston](https://www.npmjs.com/package/winston) for logging. 

```bash
git clone https://github.com/will4950/wamp
```

```bash
cd wamp && npm install 
```

### Setup dotenv 
Create a `.env` file in which to store your PORT, access credentials, and Philips Hue Bridge credentials.

```bash
touch .env
```

Copy the following into this file, which we'll add your own values to:

```bash
PORT=4000
VERIFICATION_TOKEN=
HUE_TOKEN=
HUE_BRIDGE=
HUE_LIGHTID=
```

> Remember: Never share or store your client credentials publicly. Your `.env` is included in the `.gitignore` file to ensure these files won't be included in a git workflow.

## Install [ngrok](https://ngrok.com/)

During the Webhook flow, Zoom will need to know where to send a subscribed event.

For this we'll use [ngrok](https://ngrok.com/download), which creates a public link to a localhost development server.

Download and install ngrok, then follow the steps to connect your account.

Run ngrok on the same localhost port (4000): 

```bash
~/Applications/ngrok http 4000
```

This will generate a forwarding link. Copy this and save it for the next step. 

Keep ngrok running! If the linkage disconnects, we'll need to update our Webhook endpoint URL.

Example: 

```
https://12345678.ngrok.io
```

> Note: the port in your `.env` file should match the ngrok port.  This is your Webhook Event notification endpoint URL.

# Create a Webhook Only app on the Zoom App Marketplace

Sign in to the Zoom App Marketplace and [Create a Webhook Only app](https://marketplace.zoom.us/develop/create?source=devdocs). 

To create the app, we'll need to add some quick info.  Add in the following:
1. *App Name*
2. *Company Name*
3. *Developer Name*
4. *Developer Contact*

### Add [Event Subscriptions](https://marketplace.zoom.us/docs/guides/tools-resources/webhooks#event-subscriptions)

Click the button next to `Event Subscriptions` to enable subscriptions, then Click **+ Add new event subscription**.  Before we add events, we'll need to enter some quick info.  Add in the following:
1. *Subscription Name*
2. *Event notification endpoint URL*

> Remember: we copied the Event notification endpoint URL to the clipboard in the ngrok setup.

With that info complete, click `Add Events`.  

In the Event Types window we want to enable presence status updates.  

Click `User Activity`, then select `User's presence status has been updated`.  

If you would like to add your own event handlers, select any additional events here. 

Click `Done` when finished.

With all the info collected now, click `Save`. Click `Continue` and activate the app.

## Update verification token

On the `Feature` tab for your Webhook Only app, copy and paste the `Verification Token` to your `.env` file.  

Example: ```VERIFICATION_TOKEN=RrLCDdAUTAO4955kKZwH1g```.

# Philips Hue Bridge API Token

We will need to create an API token on the Philips Hue bridge in order to send it commands. Complete the following steps:
1. [Get your Bridge IP](https://www.meethue.com/api/nupnp) from the meethue portal or another method.
2. Access the API debugger interface ```http://<bridge ip address>/debug/clip.html```.
3. Enter ```{"devicetype":"my_hue_app#app"}``` in the message body.
4. Press the *link* button on your Hue Bridge then click `Post`.

If everything worked you should see a response similar to this: 
```
[
    {
        "success": {
            "username": "7fbb0cd252f3787c2b81892b03d8a9"
        }
    }
]
```
Copy this token and place it in your `.env` file.  Example: ```HUE_TOKEN=7fbb0cd252f3787c2b81892b03d8a9```.

Enter the IP Address of your Philips Hue Bridge in your `.env` file.  Example: ```HUE_BRIDGE=0.0.0.0```.

If you have multiple lights connected to your Philips Hue Bridge, specify that in your `.env` file.  The default is light ```1```.  

Example: ```HUE_LIGHTID=1```.

# Start the Express server

If you have followed along with the setup instructions, your `.env` file should look like this:

```bash
PORT=4000
VERIFICATION_TOKEN=RrLCDdAUTAO4955kKZwH1g
HUE_TOKEN=7fbb0cd252f3787c2b81892b03d8a9
HUE_BRIDGE=0.0.0.0
HUE_LIGHTID=1
```
> Note: replace these values with your own.

Tab back to the terminal and start wamp:
```bash
npm start
```

The app should now be running.  Test it by changing your presence status.  Your Philips Hue light should change with it.

