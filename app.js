const express = require('express');
const path = require('path');
const productRouter = require('./routes/productsRouter');
require('dotenv').config();

const app = express();

const assetsPath = path.join(__dirname,'public');
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true })); 
app.set("views", path.join(__dirname, "views")); 
app.set("view engine", "ejs"); 

app.use('/', productRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT,console.log(`server live on PORT:${PORT}`))