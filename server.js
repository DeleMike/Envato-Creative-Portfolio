//import necessary packages
require('dotenv').config();

const express = require('express')
const nodemailer = require('nodemailer')
const multiparty = require('multiparty')
const app = express()

const port = process.env.PORT || 3000;

/*
middleware
Add middle ware for server to identify public files
*/
app.use(express.static('./public'));
app.use(express.json());

//home page
app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/public/index.html");
});

app.post("/send", (req, res) => {
  let form = new multiparty.Form();
  let data = {};
  //collect all data from input fields on contact page
  form.parse(req, function (err, fields) {
    console.log(fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    })

    //create a transport medium.
    const transporter = nodemailer.createTransport({
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

    // console.log(data);
    //prepare mailing object
    const mailOptions = {
      from: `"${data.firstname}" ${data.email}`,
      to: process.env.MAIL_USERNAME,
      subject: data.subject,
      text: `${data.requestDetail}`,
      // html: "<h2> This is a test Email</h2>"
    };

    // console.log('Mail Options Sender: ', `${mailOptions.from}`);
    
    /*
    send email to sender

    This transporter works for only GMAIL account. A more robust way should be put in place for
    it to work properly and ensure scalability.
    Other mail services sent to the receipent might be blocked or sent to the 'spam' folder.
    */
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent successfully");
      }
    });
  });
});


app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`)
})