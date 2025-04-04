const nodemailer = require("nodemailer");

async function sendWelcomeEmail(email, doctorName, username, password, hospitalName) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "m40195634@gmail.com", // Replace with actual email
      pass: "zdwrzlkcvljvogpe" // Replace with App Password or actual password
    }
  });

  const mailOptions = {
    from: "m40195634@gmail.com",
    to: email,
    subject: `Welcome to ${hospitalName}!`,
    text: `Dear  ${doctorName},\n\nWelcome to ${hospitalName}!\n\nYour login credentials are:\nUsername: ${username}\nPassword: ${password}\n\nPlease log in and update your details.\n\nBest regards,\n${hospitalName} Team`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("📧 Email sent successfully to", email);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}

module.exports = { sendWelcomeEmail };
