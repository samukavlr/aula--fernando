const express = require('express');
const bcrypt= require('bcryptjs');
const app = express();
const User = require('./models/User');
require('dotenv').config()


app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get("/", function(req,res){
    res.send("Serviço API Rest iciada...");
})

/////////////////// COLSULTAR TODOS////////////////////
app.get("/users",async (req,res)=>{
    await User.findAll({
        attributes:['id','name','email','gender'],
        order:[['name','ASC']]
    })
    .then((users)=>{
        return res.json({
             erro: false,
             users
        });
    }).catch((err)=>{
        return res.status(400).json({
            erro:true,
            mensagem: `Erro: ${err} ou Nenhum Usuário encontrado`
        })

    })
})
/////////////////// COLSULTAR POR "ID"////////////////////
app.get('/users/:id', async(req,res)=>{
    const {id} =req.params;
    try{
        // await User.findAll({where:{id:id}})
        const users = await User.findByPk(id);
        if(!users){
            return res.status(400).json({
                erro:true,
                mensagem:"Erro: Nenhum Usuário Encontrado!"
            })
        } 
        res.status(200).json({
            erro:false,
            users
    })
    }catch(err){
        res.status(400).json({
            erro:true,
            mensagem: `Erro: ${err}`
        })
    }   
})

/////////////////// cadastro de usuario////////////////////

app.post('/user',async(req,res)=>{
    // const {name, email, gender, password}=req.body
    var dados = req.body;
    console.log(dados);
    dados.password = await bcrypt.hash(dados.password,8)
    console.log(dados.password);

    await User.create(dados)
    .then(()=>{
        return res.json({
            erro:false,
            mensagem: 'Usuário Cadastrado com sucesso!'
        })
    }).catch((err)=>{
        return res.status(400).json({
            erro: true,
            mensagem:`Erro: Usuário não cadastrado...${err}`
        })
    })
})
/////////////////// ALTERAÇÃO DE CADASTRO////////////////////

app.put('/user',async(req,res)=>{
    const {id}= req.body;

    await User.update(req.body,{where:{id}})
    .then(()=>{
        return res.json({
            erro:false,
            mensagem:'Usuário alterado com sucesso!'
        })
    }).catch((err)=>{
        return res.status(400).json({
            erro: true,
            mensagem:`Erro: Usuário não alterado...${err}`
        })
    })
})
app.delete("/user/:id", async (req,res)=>{
    const {id} = req.params;
    await User.destroy({where:{id}})
    .then(()=>{
        return res.json({
            erro:false,
            mensagem:"Usuário apagado com sucesso"
        })
    }).catch(()=>{
        return res.status(400).json({
            erro:true,
            mensagem:`Erro: ${err} Usuário não apagado...`
        })
    })
})
app.get("/login",async(req,res)=>{
    const user= await User.findOne({
        attributes:['id','name', 'email', 'gender','password'],
        where:{
            email:req.body.email
        }
    })
    if(user===null){
        return res.status(400).json({
            erro:true,
            mensagem:"Erro: Usuario ou senha incorreto!!"
        })
    }
    if(!(await bcrypt.compare(req.body.password, user.password))){
        return res.status(400).json({
            erro:true,
            mensagem:"Erro: Email ou senha incorreta"
        })
    }
    return res.json({   
        mensagem:"login realizado com sucesso!!!",
        id: user.id,
        name: user.name,
        email:user.email,
        gender:user.gender 
    })
 })
 app.put("/user-senha",async(req,res)=>{
     const {id,password}= req.body;
     var senhaCrypt = await bcrypt.hash(password,8);

     await User.update({password: senhaCrypt}, {where:{id:id}})
     .then(()=>{
         return res.json({
             erro:false,
             mensagem: "Senha edita com sucesso!"
         })
     }).catch((err)=>{
         return res.status(400).json({
             erro: true,
             mensagem: `Erro: ${err}... A senha não foi alterada!!!`
         })
     })
 })


app.listen(process.env.PORT,()=>{
    console.log(`Servidor inicado na porta ${process.env.PORT}http://localhost:${process.env.PORT} `)
})


