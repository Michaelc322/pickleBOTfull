const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const {mongoose} = require('mongoose');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');

dotenv.config();
const app = express();


// database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database connected'))
.catch((err) => console.log('Database connection failed', err));




// middleware
app.use(express.json());
app.use('/', require('./routes/authRoutes'));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));


const PORT = 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));



