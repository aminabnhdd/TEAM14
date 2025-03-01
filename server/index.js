require('dotenv').config();

// declaring node modules we need : 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');



//defining endpoints : 

const adminRouter = require('./routes/admin');
const signUpRouter = require('./routes/signup');
const projetsRouter = require('./routes/projets');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//using routes : 




app.use('/api/projets', projetsRouter);
app.use('/api/signup', signUpRouter);
app.use('/api/admin/validate-expert', adminRouter);


// declaring our own modules :

const dbConn = require('./config/dbConn');


const PORT = process.env.PORT || 5000;


// calling the DB connection module (connect the database)
dbConn();


// some middlewares to properly handle request formats and cors 


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());











// starting the server and the DB

mongoose.connection.once('open', () => {
    console.log('connected to mongodb');
    app.listen(PORT, () => {
        console.log('server running on port :', PORT);
    })
});