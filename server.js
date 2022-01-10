const express = require('express');
const mongoose = require('mongoose');
const userRoutes  = require('./routes/userRoutes');
const cityRoutes = require('./routes/cityRoutes');
// const City = require('../models/cityModel');
const mostRoutes = require('./routes/mostRouter');
const cors = require('cors')


// set up our express app
const app = express();
// const router= express.Router();

app.use(cors())
// connect to mongodb
let mongodb = "mongodb+srv://weather:12345@cluster0.jtsgl.mongodb.net/weather?retryWrites=true&w=majority"
try {
    mongoose.connect(process.env.MONGODB_URI || mongodb);  
    mongoose.Promise = global.Promise;
    console.log("db connected")
} catch (error) {
    console.log(error,"db not connected");

}



app.use(express.static('public'));

app.use(express.json());

// router.get('/', function(req, res)  {
//     console.log('api hit');
//     res.json({message: 'hello'})
// })

// app.use('/test', router);

// initialize routes
app.use('/api/user',userRoutes);

app.use('/api/location',cityRoutes);

app.use('/api/most',mostRoutes);

// error handling middleware
app.use(function(err,req,res,next){
    //console.log(err);
    res.status(400).send({error: err.message});
});



// listen for requests
app.listen(8081, function(){
    console.log('Ready to Go!');
});

