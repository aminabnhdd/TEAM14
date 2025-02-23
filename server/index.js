require('dotenv').config();

// declaring node modules we need : 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');



//defining endpoints : 

const usersRouter = require('./routes/usersRoutes');
const expertsRouter = require('./routes/expertsRoutes');
const sectionsRouter = require('./routes/sectionsRoutes');
const projetsRouter = require('./routes/projetsRoutes');
const conflitsRouter = require('./routes/conflitsRoutes');
const annotationsRouter = require('./routes/annotationsRoutes');
const notificationsRouter = require('./routes/notificationsRoutes');

//using routes : 

app.use('/api/users', usersRouter);
app.use('/api/experts', expertsRouter);
app.use('/api/sections', sectionsRouter);
app.use('/api/projets', projetsRouter);
app.use('/api/conflits', conflitsRouter);
app.use('/api/notifications', notificationsRouter);



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