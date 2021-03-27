var AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-2',
    accessKeyId:'AKIAZ3SS2PVMGLSI2MMF',
    secretAccessKey:'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'
});

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05',});

const queueUrl="https://sqs.us-east-2.amazonaws.com/677704793432/test";
var params = {
    AttributeNames: [
       "SentTimestamp"
    ],
    MaxNumberOfMessages: 10, //defining the number of message 
    MessageAttributeNames: [
       "All"
    ],
    QueueUrl: queueUrl,
    WaitTimeSeconds: 20  // must be >=0 && <=20 s
};
   
sqs.receiveMessage(params,(err, data)=>{
    if (err) {
      console.log("Receive Error", err);
    } else if (data.Messages) {

        console.log('Message List>>>>>>>>>>');
        console.log(data)
    }
  });

// https://sqs.us-east-2.amazonaws.com/677704793432/test