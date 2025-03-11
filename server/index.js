require('dotenv').config();

// declaring node modules we need : 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require( 'cookie-parser');


//defining endpoints : 

const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth');
const projectRouter = require('./routes/projects');
const profilRouter = require('./routes/profil');
const uploadRouter = require('./routes/upload');
const editeurRouter = require('./routes/editeur');
const notificationsRouter = require('./routes/notifications');



app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())


//using routes : 

app.use('/auth', authRouter);
app.use('/projects', projectRouter);
app.use('/admin', adminRouter);
app.use('/profil', profilRouter);
app.use('/images', uploadRouter);
app.use('/editeur',editeurRouter);
app.use('/notifications',notificationsRouter);

// declaring our own modules :

const dbConn = require('./config/dbConn');




const PORT = process.env.PORT || 5000;


// calling the DB connection module (connect the database)
dbConn();


// some middlewares to properly handle request formats and cors 




app.use(cors());











// starting the server and the DB

mongoose.connection.once('open', () => {
    console.log('connected to mongodb');
    app.listen(PORT, () => {
        console.log('server running on port :', PORT);
    })
});