require('dotenv').config();

const express = require('express')
const nodemailer = require('nodemailer')
const multiparty = require('multiparty')
const app = express()

const port = process.env.PORT || 3000;

// middleware
app.use(express.static('./public'));
app.use(express.json());

app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/public/index.html");
});

app.post("/send", (req, res) => {
  //1.
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    console.log(fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });

    console.log(data);

    const mailOptions = {
      from: `"${data.firstname}" ${data.email}`,
      to: process.env.MAIL_USERNAME,
      subject: data.subject,
      text:  `${data.requestDetail}`,
     // html: "<h2> This is a test Email</h2>"
    };

    console.log('Mail Options Sender: ', `${mailOptions.from}`);

    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log("Error: " + err);
      } else {
        console.log("Email sent successfully");
        res.status(400)
      }
    });

  });
});


let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN
  }
});




app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`)
})