let testLength=10000;

let responseData=[];
for(let index=0;index<testLength;index++){
    let messageData={
        message:`Test message ${index+1}`,
        email:`test${index+1}@yopmail.com`
    }

    responseData.push(messageData);

}
fs = require('fs');
fs.writeFile('test-cases.json', responseData, function (err) {
  if (err) return console.log(err);
  console.log('Hello World > helloworld.txt');
});

console.log('Message List>>>>>>>>>>')
console.log(responseData);