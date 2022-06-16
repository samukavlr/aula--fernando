const { response } = require('express');
const { request } = require('express');
const express= require('express');

const app = express();
const port = 3333;


app.use(express.json());

const contatos = ['André','Samuel','Willy','Richard']

app.get("/", function (request,response){
    response.send("APP iniciado!!!")
});

app.get("/contatos", function (request,response){
   return response.send(contatos);
});

app.get ("/users/:id", (request, response) =>{
    const {id}=request.params;
    const {sit, vacinado}=request.query;

    return response.json({
        id,
        nome:"Theo",
        email:"thei@sp.senac.br",
        sit,
        vacinado,
    });
});

app.post("/contatos", (request, response) => {
    const {nome}=request.body;

    contatos.push(nome);

    return response.json(contatos)
});

app.delete("/users/:id",(request,response) =>{
    contatos.pop();
    return response.json(contatos)
})









app.listen(port, ()=>{
    console.log(`Servidor Iniciado na porta ${port}`)
})