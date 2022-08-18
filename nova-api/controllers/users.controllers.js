const Users = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.findAll= async (req, res) =>{
    await Users.findAll({
        attributes: ['id','name', 'email', 'gender','password', ],
        order:[['name', 'ASC']],
        // include:[Categories]
    })
    .then( (users) =>{
        return res.json({
            erro: false,
            users
        });
    }).catch( (err) => {
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err} ou Nenhuma Usuário Encontrada!!!`
        })
    })

}
/////// MOSTRAR 1/////
exports.findOne= async (req, res) => {
    const { id } = req.params;
    try {
        // await Categories.findAll({ where: {id: id}})
        const users = await Users.findByPk(id);
        if(!users){
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum Usuário encontrado!"
            })
        }
        res.status(200).json({
            erro:false,
            users
        })
    } catch (err){
        res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err}`
        })
    }
}
////////CRIAR///////
exports.create= async (req, res) =>{
    
    var dados = req.body;
    dados.password = await bcrypt.hash(dados.password, 8);
    let email = dados.email;
    let name = dados.name;
    let gender = dados.gender;

    await Users.create(dados)
    .then( ()=>{
      
        return res.json({
            erro: false,
            mensagem: 'Usuário cadastrado com sucesso!'
        });
    }).catch( (err)=>{
        return res.status(400).json({
            erro:true,
            mensagem: `Erro: Usuário não cadastrado... ${err}`
        })
    })
}

///////////ALTERAR/////////////
 exports.update= async (req, res) => {
    var dados = req.body;
    dados.password = await bcrypt.hash(dados.password, 8);
    const { id } = req.body;

    await Users.update(req.body, {where: {id}})
    .then(() => {
        return res.json({
            erro:false,
            mensagem: 'Usuário alterado com sucesso!'
        })
    }).catch( (err) =>{
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: Usuário não alterado ...${err}`
        })
    })
}
////////////DELETAR/////////////////
exports.delete= async (req, res) => {
    const { id } = req.params;
    await Users.destroy({ where: {id}})
    .then( () => {
        return res.json({
            erro: false,
            mensagem: "Usuário apagado com sucesso!"
        })
    }).catch( (err) =>{
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err} Usuário não apagado...`
        })
    })
}
exports.login = async (req, res) => {

    // await sleep(2000)
    // function sleep(ms){
    //     return new Promise((resolve) =>{
    //         setTimeout(resolve,ms)
    //     })
    // }

    const user = await Users.findOne({
        attributes: ['id', 'name', 'email', 'gender', 'password'],
        where: {
            email: req.body.email
        }
    })
    if(user === null){
        return res.status(400).json({
            erro: true,
            mensagem:"Erro: Email ou senha incorreta!!!"
        })
    }
    if(!(await bcrypt.compare(req.body.password, user.password))){
        return res.status(400).json({
            erro: true,
            mensagem:"Erro: Email ou senha incorreta!!!"
        })
    }

    let token = jwt.sign({id: user.id}, process.env.SECRET, {
        expiresIn: 600
    })

    return res.json({
        erro:false,
        mensagem: "Login realizado com sucesso!!!",
        token
    })
}