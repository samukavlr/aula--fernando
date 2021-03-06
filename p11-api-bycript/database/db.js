const Sequelize =require('sequelize');
//process.env.DB_USER

const sequelize = new Sequelize(process.env.DB,'root','',{
    host:process.env.DB_HOST,
    dialect:'mysql'
});


sequelize.authenticate().then(()=>{
    console.log('Conexão como banco de dados realizada com sucesso!!');
}).catch((erro)=>{
    console.log(`Erro de conexão: ${erro}`);

})


module.exports = sequelize;