const express = require('express')
const app = express();
const port = 4500;
const User =require('./models/User');

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
            mensagem: `Erro: ${err} ou Nenhum Ususário encontrado`
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
    await User.create(req.body)
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

app.listen(port,()=>{
    console.log(`Servidor inicado na porta ${port}http://localhost:${port} `)
})


