require('dotenv').config();

// declaring node modules we need : 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require( 'cookie-parser');


app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));


//defining endpoints : 

const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth');
const projectRouter = require('./routes/projects');
const profilRouter = require('./routes/profil');
const AIRouter = require('./routes/ai');
const uploadRouter = require('./routes/upload');
const editeurRouter = require('./routes/editeur');
const notificationsRouter = require('./routes/notifications');
const refreshRouter = require('./routes/refresh');
const oauthRouter = require('./routes/oauth');
const chatbotRouter = require('./routes/aiChatbot');

const impressionRouter = require('./routes/impression');



const corsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true, 
};



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser())


// importing roles :
const adminRole = process.env.ADMIN_ROLE;
const expertRole = process.env.EXPERT_ROLE;
const visitorRole = process.env.VISITOR_ROLE;

// importing middlewares : 
const validateToken = require('./middlewares/authMiddleware');
const {validateRole} = require('./middlewares/roleMiddleware');



//using routes : 


app.use('/auth', authRouter);
app.use('/projects', projectRouter);
app.use('/admin',validateToken,validateRole([adminRole]),adminRouter);
app.use('/profil', profilRouter);
app.use('/ai',AIRouter);
app.use('/images', uploadRouter);
app.use('/editeur',editeurRouter);
app.use('/notifications',notificationsRouter);
app.use('/refresh',refreshRouter);
app.use('/impression', impressionRouter);
app.use('/oauth',oauthRouter);
app.use('/chatbot', chatbotRouter);

// declaring our own modules :

const dbConn = require('./config/dbConn');




const PORT = process.env.PORT || 5000;


// calling the DB connection module (connect the database)
dbConn();






// starting the server and the DB

mongoose.connection.once('open', () => {
    console.log('connected to mongodb');
    app.listen(PORT, () => {
        console.log('server running on port :', PORT);
    })
});





