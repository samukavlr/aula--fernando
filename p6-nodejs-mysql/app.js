const mysql =require('mysql2');

const connection = mysql.createConnection({

 // string de conexão
   //{
        host:"localhost",
        user:"root",
        password:"",
        database:"senac"
   //} 

});

connection.connect(function (erro){
    console.log("Conecxão com o banco de dados realizado com sucesso");
    console.log(`Conecxão ${connection.threadId}`);
    if(erro){
        console.log(`Erro:${erro}`)
    }
});

connection.query('SELECT *FROM users',(erro,rows,felds)=>{
    if(!erro){
        console.log("resultado:",rows);
    }

    else{
        console.log(`Erro consulta:${erro}`)
    }
})

//Cadastramento de novos registros de banco de dados

connection.query("INSERT INTO users (name, email, gender) VALUES ('Aluna', 'Email@email.com', 'F')",
(erro,result)=>{
    if(!erro){
        console.log('Usuario cadastrado com sucesso!!');
    }
    else{
        console.log(`Erro cadastro usuário: ${erro}`);
    }
}
)