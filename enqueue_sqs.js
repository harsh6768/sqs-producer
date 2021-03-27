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

for(let i=0;i<100;i++){
    // var params = {};
    var params = {
        
       MessageBody: `Testing SQS Message ${i+1}`,
       // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
       // MessageGroupId: "Group1",  // Required for FIFO queues
       QueueUrl: "https://sqs.us-east-2.amazonaws.com/677704793432/test1"
     };
    
    sqs.sendMessage(params,(err,data)=>{
        if(err){
            console.log('Error',err);
        }else{
            console.log('Success',data.MessageId);
        }
    })
}

// https://sqs.us-east-2.amazonaws.com/677704793432/test