# sqs-producer
It contains all the required methods for AWS SQS(Simple Queue Service)


#### Apis

1.  Send Bulk Message to Sqs Fifo Queue : 
    
    Url :  http://localhost:3001/api/send-bulk-message 
    Method : Post
    Request body : 
            {
                "messages":[
                    {
                        "message":"test 1",
                        "email":"test1@yopmail.com"
                    }
                  ]
            }
            
 2. Send Message To SQS Fifo Queue : 

   Url : http://localhost:3001/api/sendMessage
   Method : Post 
   Request Body : 
    
           {
            "message_data":"Test message 3",
            "email":"test3@yopmai.com"
          } 

