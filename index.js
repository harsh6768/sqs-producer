const express =require('express');
const app=express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '100mb' ,extended: false }));

app.use(require('./routes/routes'));
let PORT=3001;

app.listen(PORT,()=>{
    console.log(`Server is up and running in port ${PORT}`);
})