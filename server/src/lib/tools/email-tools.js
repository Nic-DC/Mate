import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SEND_GRID_KEY);

const sendRegistrationMail = async (recipientAddress, username) => {
  console.log("ENV - key: ", process.env.SEND_GRID_KEY);
  console.log("ENV - sender: ", process.env.SENDER_EMAIL);
  const msg = {
    to: recipientAddress,
    from: process.env.SENDER_EMAIL,
    subject: "Welcome to our app!",

    html: `
         <p>Hi ${username},</p>
         <p>Thank you for registering with AImate. We look forward to seeing you on the platform.</p>
         <p>Please use this email to log into your account: <strong>${recipientAddress}</strong></p>
         <p><a href="http://localhost:3000/home">Write your path!</a></p>

         <p><strong>With Love,</strong></p>
         <p>The Team</p>
       `,
  };
  await sgMail.send(msg);
};

export default sendRegistrationMail;
