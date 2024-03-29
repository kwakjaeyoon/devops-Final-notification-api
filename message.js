'use strict'; 

const aws = require('aws-sdk');
const queueUrl = process.env.NOTIFY_QUEUE_URL;
// // NOTIFY_QUEUE_URL
// aws.config.loadFromPath({ 
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
//     // AWS_ACCESS_KEY_ID
//     secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
//     // AWS_SECRET_ACCESS_KEY
//     region: "ap-northeast-2"
// });
const sqs = new aws.SQS();

const params = {
    "QueueUrl": queueUrl,
    "MaxNumberOfMessages": 10
  };


async function list_queue(){
  const getList = sqs.listQueues({}, (err, data) => {
    if(err) {
      console.log(err);
    } else {
      console.log(data);
      console.log("There are no messages list in SQS");
    } 
  });
}


async function receive_queue(){
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
}



module.exports = {
    list_queue,
    receive_queue
} 