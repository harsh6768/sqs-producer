const AWS = require('aws-sdk');
const request=require('request');
const splitArray = require("split-array");
const uuid = require('uuid');
const path=require('path');
let configPath = path.join(__dirname, '../config/config.json');
console.log('Config Path',configPath);
AWS.config.loadFromPath(configPath);

// AWS.config.update({
//     region: 'us-east-2',
//     accessKeyId:'AKIAZ3SS2PVMGLSI2MMF',
//     secretAccessKey:'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'
// });


// Create an SQS service object
const sqs = new AWS.SQS({apiVersion: '2012-11-05',});
const queueUrl= "https://sqs.us-east-2.amazonaws.com/677704793432/test.fifo";


class SqsController{

    //sending messages to the fifo queue
    static async sendMessageToQueue(req,res){

        let {message_data,email}=req.body;
        console.log('Request body >>>>>>',req.body);
        let messageData={
            "message":message_data,
            "email":email
        }
        // var params = {};
        var params = {
            // Remove DelaySeconds parameter and value for FIFO queues
            //    DelaySeconds: 10,
            MessageAttributes: {
                "Message": {
                    DataType: "String",
                    StringValue: message_data
                },
                "Email": {
                    DataType: "String",
                    StringValue: email
                },
            },
            MessageBody: JSON.stringify(messageData),
            MessageDeduplicationId: email,  // Required for FIFO queues
            MessageGroupId: "sqs-test",  // Required for FIFO queues
            QueueUrl:queueUrl
        };

        //send message
        sqs.sendMessage(params,async(err,data)=>{
            if(err){
                console.log('Error',err);
            }else{
                console.log('Success',data);

                // res.status(200).json({
                //     message:'Message sent successfully!',
                //     data: data
                // })

                // hook for receiving the message
                const options = {
                    url: 'http://localhost:3002/api/receiveMessage',
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Accept-Charset': 'utf-8',
                    }
                };
                
                request(options, (err, response, body)=>{
                    let json = JSON.parse(body);
                    console.log(json);
                    res.status(200).json(json)
                });
                
            }
        })

    }

    //for seding batch 
    static async sendBatchMessage(req,res){

        let {messages}=req.body;

        // async function sendMessages(queueUrl, messages) {
        const spilttedArray = splitArray(messages, 10);
        for (const arr of spilttedArray) {
            console.log('Method Called >>>>>>>>>>>>>>>>>>>>>>>>>>>>');
            var params = {
                QueueUrl: queueUrl,
                Entries: []
            };
            for (const message of arr) {
                params.Entries.push({
                    Id: uuid.v4(),
                    MessageBody: JSON.stringify(message),
                    MessageGroupId:'sqs-test',
                    MessageDeduplicationId: message.email
                });
            }
            await sqs.sendMessageBatch(params).promise();
            
        }

        res.status(200).json({
            data:'Message sent successfully!'
        })

        
    }
    static async receiveMessageFromSqs(){
    
        //get queue details
        let totalMessageCount=await SqsController.getQueueDetail();
    
        // return;
        if(totalMessageCount>0){
        
            //receive message
            let receivedMessageList=await SqsController.receiveMessageFromQueue();

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
                    //deleting message
                    let data= await sqs.deleteMessage(deleteParams).promise();

                }
                
                //do check again to receive message
                SqsController.receiveMessageFromSqs();
        
            }
        
        }
        

    }
    
    //getting the total number of messages from the queue
    static async getQueueDetail(){
                     
        var params = {
            QueueUrl: queueUrl,
            AttributeNames:[
                'All'
            ]
        };
            
        let data=await sqs.getQueueAttributes(params).promise();
        console.log('Data details',data)
        
        if(data && data.Attributes){
            //getting total number of message in the queue
            let {ApproximateNumberOfMessages}=data.Attributes;
            return ApproximateNumberOfMessages;
        }

    }

    static async receiveMessageFromQueue(){
        
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
            WaitTimeSeconds: 20 ,//for long polling 
        
        };

        let data=await sqs.receiveMessage(receiveMessageParams).promise();
        if(data && data.Messages){
            return data.Messages;
        }
        
    }

}

module.exports=SqsController;