const express = require('express');
const app = express();
require('dotenv').config()
var cors= require('cors')

const Categories = require('./models/Categories');


app.use( (req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    app.use(cors());
    next();
})
const router = require('./routes/index')

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get("/", function (request, response) {
    response.send("Serviço API Rest iniciada...");
})

app.use(router)

app.listen(process.env,()=>{
    console.log(`Servidor inicado na porta ${process.env.PORT}http://localhost:${process.env.PORT} `)
})

