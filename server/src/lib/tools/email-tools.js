import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SEND_GRID_KEY);

const sendRegistrationMail = async (recipientAddress, username) => {
  console.log("ENV - key: ", process.env.SEND_GRID_KEY);
  console.log("ENV - sender: ", process.env.SENDER_EMAIL);
  const msg = {
    to: recipientAddress,
    from: process.env.SENDER_EMAIL,
    subject: "Welcome to our app!",
    text: `Hi ${username},\n\nThank you for registering with our app. We look forward to seeing you on our platform.\n\nBest regards,\nThe Team`,
  };
  await sgMail.send(msg);
};

export default sendRegistrationMail;
