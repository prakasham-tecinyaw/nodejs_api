require('dotenv').config();

// imports
const express = require('express');
const mongoose = require('mongoose');

// create express app
const app = express();

// db connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', ()=> console.error('Connected to DB'));

app.use(express.json());

const userRouter = require('./routes/users');
app.use('/users', userRouter);


app.listen(3000, () => console.log('Server started'));

