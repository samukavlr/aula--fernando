//https://nodejs.org/dist/latest-v16.x/docs/api/synopsis.html#example

const http =require ('http');
const port =3500;

const server = http.createServer((req,res)=>{
    res.end("Página inicial do Server Nodejs");
});

server.listen(port, () =>{

    console.log(`Servidor iniciado ma porta ${port}: http://localhost:${port}`)

})

