var config = require('../config.json');
// Connect to the Twilio API
const client = require('twilio')(config["twilioAccountSid"], config["twilioAuthToken"]);

exports.sendNotification = async function(req, res) {
// TODO: At some point change these hardcoded phone numbers so ppl will stop texting me
  client.messages.create({
    // Whom to send tho message too
    to: '',
    // The Twilio Phone number to send it from
    from: '+18036755450',
    // Parse a message out of the post request body
    body: JSON.stringify(req.body["message"])
  }).then((message) => console.log(message.sid + " sent!"));
  res.status(200).send("message sent");
}
