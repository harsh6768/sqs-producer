const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-2',
  accessKeyId:'AKIAZ3SS2PVMGLSI2MMF',
  secretAccessKey:'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'
});
// Create the SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

const queueUrl="https://sqs.us-east-2.amazonaws.com/677704793432/test.fifo";

var params = {
 QueueUrl: queueUrl,
  AttributeNames:[
    'All'
  ]
};

var receiveMessageParams = {
    AttributeNames: [
       "SentTimestamp"
    ],
    MaxNumberOfMessages: 3, //defining the number of message 
    MessageAttributeNames: [
       "All"
    ],
    QueueUrl: queueUrl,
    VisibilityTimeout: 0,
    WaitTimeSeconds: 20 //for long polling 

};
   
async function receiveMessageFromQueue(){
    let data=await sqs.receiveMessage(receiveMessageParams).promise();
    if(data && data.Messages){
      return data.Messages;
    }
    
}

//getting the total number of messages from the queue
async function getQueueDetail(){
  let data=await sqs.getQueueAttributes(params).promise();
  console.log('Data details',data)
  
  if(data && data.Attributes){
    let {ApproximateNumberOfMessages}=data.Attributes;
    return ApproximateNumberOfMessages;
  }
}

//executing all message
async function executingAllMessage(){
   
  //get queue details
  let totalMessageCount=await getQueueDetail();


  return;
  if(totalMessageCount>0){
 
    //receive message
    let receivedMessageList=await receiveMessageFromQueue();
    if(receivedMessageList){
      console.log('Received Message List >>>>>>>>>>>>>>>>');
      console.log(receivedMessageList);
      //deliting received message
      for(let messageIndex=0;messageIndex<receivedMessageList.length;messageIndex++){
        let message=receivedMessageList[messageIndex]
        // console.log('Message Details >>>>>',message);
        var deleteParams = {
          QueueUrl: queueUrl,
          ReceiptHandle: message.ReceiptHandle
        };
        let data= await sqs.deleteMessage(deleteParams).promise();
      }
      
      executingAllMessage();

    }

  }

}

executingAllMessage()