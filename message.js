'use strict'; 

const aws = require('aws-sdk');
const queueUrl = "https://sqs.ap-northeast-2.amazonaws.com/104785054338/notify-queue";

aws.config.loadFromPath(__dirname + '/config.json');
const sqs = new aws.SQS();

const params = {
    "QueueUrl": queueUrl,
    "MaxNumberOfMessages": 10
  };


const getList = sqs.listQueues(function(err, data) {
    if(err) {
        console.log(err);
    } 
    else {
        console.log(data);
        console.log("There are no messages list in SQS");
    } 
});


  
const receiver = sqs.receiveMessage(params, (err, data) => {
    if (err) {
        console.log(err, err.stack);
    } else {
        if (!Array.isArray(data.Messages) || data.Messages.length === 0) { 
        console.log("There are no messages available for processing."); 
        return;
        }    

        const body = JSON.parse(data.Messages[0].Body);
        console.log(`receive message is Success! -> ${body}`);


        const delParams = {
        "QueueUrl": queueUrl,
        "ReceiptHandle": data.Messages[0].ReceiptHandle
        };

        sqs.deleteMessage(delParams, (err, data) => {
        if (err) {
            console.log("There was an error", err);
        } else {
            console.log("Message delete Success!");
        }
        });
    }
});

  module.exports = {
    receiver,
    getList
  } 