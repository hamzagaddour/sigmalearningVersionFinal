const express = require("express")
const dotenv = require ('dotenv').config()
const port = process.env.PORT || 5000
const cors = require("cors");
const connectDB = require ('./config/db')
const bodyParser = require("body-parser");

connectDB()
const app= express()
//Middlewares
app.use(bodyParser.json());
app.use(cors());

/*
*/
const userRoutes = require("./routes/userRoutes"); 
const courseRoutes = require('./routes/courseRoutes')
const chapterRoutes = require ('./routes/chapterRoutes')
const qcmRoutes = require ('./routes/qcmRoutes')
const questionRoutes = require ('./routes/questionRoutes')

app.use('/api', userRoutes)
app.use('/api', courseRoutes)
app.use('/api', chapterRoutes)
app.use('/api', qcmRoutes)
app.use('/api', questionRoutes)

app.listen(port, ()=> console.log(`server runing on port ${port}`))