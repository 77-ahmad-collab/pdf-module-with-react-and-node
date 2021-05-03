const express = require("express");
const pdf = require("html-pdf");
const bodyParser = require("body-parser");
const pdftemp = require("./documents");
const nodemailer = require("nodemailer");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//router pdf genertaionn
app.post("/pdf", (req, res) => {
  console.log(req.body);
  pdf.create(pdftemp(req.body), {}).toFile("proposal.pdf", (err) => {
    if (err) {
      return res.send("error is there");
    }
  });
  res.send("response detected");
});

//send pdf to client
app.get("/pdfgen", (req, res) => {
  res.sendFile(`${__dirname}/proposal.pdf`);
});

//send mail to client
app.post("/mail", async (req, res) => {
  console.log(req.body);
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "hotmail",

    auth: {
      user: "ahmaddddd56@outlook.com",
      pass: "1712ahmad",
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  const list = ["ahmaq098@gmail.com", "mzlapq639@gmail.com"];
  const mailOptions = {
    from: "ahmaddddd56@outlook.com",
    to: list,
    subject: "Sending Email using Node.js",
    text: "That was easy!",
    html: "hurray hahahah",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  res.send("hello mail");
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("app is listening on poort 5000");
});
