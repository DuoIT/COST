const express = require('express');
const port = process.env.PORT

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});


const http = require('http').Server(app);
http.listen(port, ()=>{
    console.log('Port' + ' ' + `${port}` + ' '+ 'is starting...');
});


module.exports = app;