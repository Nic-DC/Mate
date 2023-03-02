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
         <p>Thank you for registering with our app. We look forward to seeing you on our platform.</p>
         <p>Please use this email to log into your account:</p>
         <ul>
           <li>Email: ${recipientAddress}</li>
         </ul>
         <p><a href="http://localhost:3000/journal">Start journaling!</a></p>
         <p>Best regards,</p>
         <p>The Team</p>
       `,
  };
  await sgMail.send(msg);
};

export default sendRegistrationMail;
