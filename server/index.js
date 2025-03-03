require('dotenv').config();

// declaring node modules we need : 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');


// declaring our own modules :

const dbConn = require('./config/dbConn');
const authRouter = require('./routes/auth');
const projectRouter = require('./routes/projects');
const profileRouter = require("./routes/profil")

const PORT = process.env.PORT;


// calling the DB connection module (connect the database)
dbConn();


// some middlewares to properly handle request formats and cors 


app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(cors());



app.use('/auth',authRouter);
app.use('/projects',projectRouter);
app.use('/profil',profileRouter);






// starting the server and the DB

mongoose.connection.once('open',()=>{
    console.log('connected to mongodb');
    app.listen(PORT,()=>{
        console.log('server running on port :',PORT);
    })
});
