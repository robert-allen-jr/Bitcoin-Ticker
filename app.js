//jshint esversion: 6
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request')

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
  // console.log(req.body.crypto)
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amount = req.body.amount;
  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  };

  request(options, function(err, response, body){
    var data = JSON.parse(body);
    var price = data.price;
    var currentDate = data.time;
    console.log(price)
    res.write("<p>The current date is " + currentDate + "</p>");
    res.write("<h1>" + amount + crypto + " is currently worth " + price + fiat + "</h1>")
    res.send();
  });
});

app.listen(3003, function(res, req){
  console.log("Server is running, All good");
});
