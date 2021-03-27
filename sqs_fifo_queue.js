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
var params = {
    QueueName: 'mytest.fifo', //queue name should be ends with .fifo
    Attributes: {
        "FifoQueue": "true",  //mandatory for the fifo queue ,
        "DeduplicationScope": "messageGroup",  //messageGroup | queue
        "FifoThroughputLimit": "perMessageGroupId", // perMessageGroupId | perQueue 
        "ContentBasedDeduplication": "true"  // true|false
    }

};

sqs.createQueue(params,(err,data)=>{

    if(err){
        console.log('Error',err)
    }else{
        console.log('Success',data)
    }

})

// https://sqs.us-east-2.amazonaws.com/677704793432/test