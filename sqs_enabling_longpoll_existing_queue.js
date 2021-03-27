var AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-2',
  accessKeyId:'AKIAZ3SS2PVMGLSI2MMF',
  secretAccessKey:'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'
});
// Create the SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var params = {
 Attributes: {
  "ReceiveMessageWaitTimeSeconds": "20",
 },
 QueueUrl: "https://sqs.us-east-2.amazonaws.com/677704793432/test"
};

sqs.setQueueAttributes(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});

