require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;
const urlRouter = require('./Routers/urlRouter');
const MongoDb = require('./config/mongo');
const cors = require('cors');
MongoDb();
app.use('/',cors());
app.use(express.json());
app.use('/',urlRouter);
app.listen(PORT,()=>{
    console.log(`Server Running On Port ${PORT}`);
})
