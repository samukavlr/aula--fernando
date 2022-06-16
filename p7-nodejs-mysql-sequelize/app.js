const Sequelize =require('sequelize');

const sequelize =new Sequelize('senac','root','',{
    host:'localhost',
    dialect:'mysql'
});


sequelize.authenticate().then(()=>{
    console.log('Conexão como banco de dados realizada com sucesso!!');
}).catch((erro)=>{
    console.log(`Erro de conexão: ${erro}`);

})

const Users = sequelize.define('users',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING(50),
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    gender:{
        type:Sequelize.STRING(1),
        allowNull:true
    },

    password: {
        type:Sequelize.STRING,
        aloowNull:false
    }
})

/////crear tabela com Sequelize/////

    // Users.sync();
    //exclui a tabela e criar novamente 
    // Users.sync({force: true})

    // verificar se há alguma diferença na tabela, realiza alteração 
    Users.sync({alter:true});
    //  Cadastrar registro no banco de dados
    // Users.create({
    //     name:"Aluno",
    //     email:"email@email.com",
    //     gender:"M"
    // })




