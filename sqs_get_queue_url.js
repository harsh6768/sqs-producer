var AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-2',
    accessKeyId:'AKIAZ3SS2PVMGLSI2MMF',
    secretAccessKey:'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'
});

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05',});

//configuring the queue
var params = {
    QueueName: 'SQS_QUEUE_NAME',   //defining the name of the queue
};

sqs.getQueueUrl(params,(err,data)=>{
    if(err){
        console.log('Error',err)
    }else{
        console.log('Success',data);
    }
})
