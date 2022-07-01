const Sequelize =require('sequelize');
const db= require('../database/db')



const Users = db.define('samuel-users',{
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
    // Users.sync({alter:true});

    module.exports = Users;