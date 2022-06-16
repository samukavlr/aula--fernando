

const express= require('express');

const app = express();
const port = 4500;

app.get("/", function (request,response){
    response.send("Pagina iniciado do Servidor")
})

app.get("/sobre-empresa", (req,res)=>{
    res.send("Pagina sobre a epresa do APP")
})

app.get("/contato", (req,res)=>{
    res.send("contato do app")
})

app.listen(port , () =>{
    console.log(`Servidor iniciado na porta ${port} `)
})