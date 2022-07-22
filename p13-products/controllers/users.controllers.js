const Users = require('../models/User')
const bcrypt = require('bcryptjs');

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
            categorias
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
        /* enviar e-mail */
        let to = email;
        let cc = '';
        var htmlbody = "";
        htmlbody += '<div style="background-color:#000; margin-bottom:150px;">';
        htmlbody += '<div style="margin-top:150px;">';
        htmlbody += '<p style="color:#fff; font-weight:bold;margin-top:50px;">';
        htmlbody += 'Olá {name},';
        htmlbody += '</p>';
        htmlbody += '<p style="color:#fff; font-style:italic;margin-top:50px;">';
        htmlbody += 'Sua conta foi criada com sucesso!';
        htmlbody += '</p>';
        htmlbody += '<p style="color:#fff;margin-top:50px;">';
        htmlbody += 'Seu login é o seu email: {email}';
        htmlbody += '</p>';
        htmlbody += '<p style="color:#fff;margin-top:50px;">';
        htmlbody += 'Sexo: {gender}';
        htmlbody += '</p>';
        htmlbody += '</div>';
        htmlbody += '</div>';
        htmlbody = htmlbody.replace('{name}', name);
        htmlbody = htmlbody.replace('{email}', email);
        htmlbody = htmlbody.replace('{gender}', gender);
        /* ************* */
        sendMail(to, cc, 'Sua conta foi criada com sucesso!', htmlbody);

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