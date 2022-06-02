const express  = require('express');
const msg = require('./message'); 

const app  = express();
const port = 3000;


app.get('/', function (req, res) {
    res.send({"hello":"world"});
});


// return queue list
app.get('/list', function (req, res) {
    msg.getList;
});


// receive queue message
app.get('/receive', function (req, res) {
    msg.receiver;
});


app.listen(port, () => {
    console.log(`SQS Consumer is running ${port} port!`);
  });