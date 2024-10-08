const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data.js");
const mongoose = require('mongoose');
const connectDB = require("./config/db.js");
const colors = require('colors');
const userRoutes = require('./routes/userRoutes.js');
const chatRoutes = require('./routes/chatRoutes.js')
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(express.json());

app.get('/', (req, res)=>{
    res.send("Api is running");
});

app.use('/api/user', userRoutes)

app.use('/api/chat', chatRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`.yellow.bold);
});