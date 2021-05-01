const express = require("express");
const pdf = require("html-pdf");
const bodyParser = require("body-parser");
const pdftemp = require("./documents");
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
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("app is listening on poort 5000");
});
