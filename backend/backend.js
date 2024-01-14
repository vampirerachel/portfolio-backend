const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());

// Your form submission endpoint
app.post('/submitForm', (req, res) => {
  const { name, email, message } = req.body;

  // Create a transporter using SMTP details or other email configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your@gmail.com', // Your Gmail address
      pass: 'your_password', // Your Gmail password or an app-specific password
    },
  });

  // Define the email content
  const mailOptions = {
    from: 'your@gmail.com',
    to: 'your@gmail.com',
    subject: 'New Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Form submitted successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
