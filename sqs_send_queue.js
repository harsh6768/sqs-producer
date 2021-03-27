// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({
    region: 'us-east-2',
    accessKeyId:'AKIAZ3SS2PVMGLSI2MMF',
    secretAccessKey:'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'
});

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05',});

// var params = {};
// let message={
//   body:'test message',
//   email:'test@yopmail.com'
// }

var params = {
    // Remove DelaySeconds parameter and value for FIFO queues
//    DelaySeconds: 10,
  //  MessageAttributes: {
  //    "Title": {
  //      DataType: "String",
  //      StringValue: "The Whistler"
  //    },
  //    "Author": {
  //      DataType: "String",
  //      StringValue: "John Grisham"
  //    },
  //    "WeeksOn": {
  //      DataType: "Number",
  //      StringValue: "6"
  //    }
  //  },
   MessageBody: "Message testing 5",
   // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
   // MessageGroupId: "Group1",  // Required for FIFO queues
   QueueUrl: "https://sqs.us-east-2.amazonaws.com/677704793432/test"
 };

sqs.sendMessage(params,(err,data)=>{
    if(err){
        console.log('Error',err);
    }else{
        console.log('Success',data);
    }
})

// https://sqs.us-east-2.amazonaws.com/677704793432/test