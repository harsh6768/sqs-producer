const express = require('express');
const Router = express.Router();

// controllers

const SqsController=require('../controllers/sqs_controller');


Router.post('/sendMessage',SqsController.sendMessageToQueue);
Router.post('/send-bulk-message',SqsController.sendBatchMessage);
Router.get('/getAllMessages',SqsController.receiveMessageFromSqs);
Router.get('/test',(req,res)=>res.send('Server apis are working just fine !'));




module.exports=Router;