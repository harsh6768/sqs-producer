const AWS = require('aws-sdk');
const { Consumer } = require('sqs-consumer');

AWS.config.update({
    region: 'us-east-2',
    accessKeyId:'AKIAZ3SS2PVMGLSI2MMF',
    secretAccessKey:'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'
});

const queueUrl="https://sqs.us-east-2.amazonaws.com/677704793432/test";

// Configure the region
const app = Consumer.create({
    queueUrl: queueUrl,
    handleMessage: async (message) => {
        console.log('Message List >>>>>>>>>>>>>');
        console.log(message);
    },
    sqs: new AWS.SQS({apiVersion: '2012-11-05',}),
    waitTimeSeconds:20,
    batchSize:10 // can't be more than 10 
});

app.on('error', (err) => {
    console.error(err.message);
});

app.on('processing_error', (err) => {
    console.error(err.message);
});

app.start();