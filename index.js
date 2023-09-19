const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const  user  = require('./routes/user');
const MinecraftService  = require('./routes/minecraftService');
require('dotenv').config({path:__dirname+'/./../.env'});
const app = express();
console.log("test")
app.use(morgan('dev'));
app.use(cors());


// db.on('error', console.error.bind(console, 'MongoDB connection error:'))
app.use('/server',MinecraftService);
app.use('/user',user);

console.log("running on port 5000");
app.listen(5000)