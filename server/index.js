const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const MongoDb = require('./utils/databaseConnection');
const cookieParser = require('cookie-parser');


const app = express();
dotenv.config();

app.use(express.json());
app.use( cors({
    origin: "*",  
    credentials: true,
  }))

app.use(express.json());
app.use(cookieParser());


app.use('/api/tasks', require('./Routes/tasksRoute.js'));
app.use('/api/user',require('./Routes/userRoute.js'));

MongoDb()
.then(()=>{
    const PORT = process.env.PORT || 3000
    app.get('/',(req, res)=>{
          res.json(`Server is running on port ${PORT}`);
    })
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    })
})
.catch((error)=>{
    console.log("Conction failed : ",error);
    
})