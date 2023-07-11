import twilio from "twilio/lib/rest/Twilio.js";
import readline from "readline";
// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const accountSid = "AC7065f34c00a23fb05a44f2ef1908c86b";
const authToken = "b8b2a4cd2164fb52e2e94d790dbba039";
const verifySid = "VAfbf55d8de9858aac4bee66bf444ed45b";
const client = new twilio(accountSid, authToken);


client.verify.v2
  .services(verifySid)
  .verifications.create({ to: "+5521990454165", channel: "sms" })
  .then((verification) => console.log(verification.status))
  .then(() => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("Please enter the OTP:", (otpCode) => {
      client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to: "+5521990454165", code: otpCode })
        .then((verification_check) => console.log(verification_check.status))
        .then(() => rl.close());
    });
  });