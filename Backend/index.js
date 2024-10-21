import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRout from './router/userRout.js';
import messageRout from './router/messageRout.js';
import cookieParser from "cookie-parser";
import cors from 'cors'
import { app, server } from './SocketIo/server.js';


dotenv.config();
app.use(express.json()) ;
app.use(cookieParser());
app.use(cors())

const port = process.env.PORT;

const URL = process.env.MONGO_URL;
try {
    mongoose.connect(URL);
    console.log('MongoDB Connected');
} catch (err) {
    console.log(err);
}

app.get('/', (req, res) => {
    res.send('server is running');
});

app.use('/api/user', userRout);
app.use('/api/message' , messageRout) ;


server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
