var config = require('../config.json');
// Connect to the Twilio API
const client = require('twilio')(config["twilioAccountSid"], config["twilioAuthToken"]);

exports.sendNotification = async function(req, res) {
// TODO: At some point change these hardcoded phone numbers so ppl will stop texting me
// TODO: Add some error handling
  var phoneNumber = req.body["phoneNumber"]
  var ReminderMessage = " " + JSON.stringify(req.body['message'])// "This is a reminder of your advising appointment with " + advisor + " at " + date + " in room " + roomNumber
  console.log("SMS: ", req.body)
  client.messages.create({
    // Whom to send tho message too
    to: '+1' + phoneNumber,
    // The Twilio Phone number to send it from
    from: '+18036755450',
    // Parse a message out of the post request body
    body: ReminderMessage
  }).then((message) => console.log(message.sid + " sent!"));
  res.status(200).send("message sent");
}
