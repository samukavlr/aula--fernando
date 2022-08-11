const Categories = require('../models/Categories')


////// LISTA /////////
exports.findAll= async (req, res) =>{
    await Categories.findAll({
        attributes: ['id', 'name', 'description', ],
        order:[['name', 'ASC']]
    })
    .then( (categorias) =>{
        return res.json({
            erro: false,
            categorias
        });
    }).catch( (err) => {
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err} ou Nenhuma categoria Encontrada!!!`
        })
    })

}
/////// MOSTRAR 1/////
exports.findOne= async (req, res) => {
    const { id } = req.params;
    try {
        // await Categories.findAll({ where: {id: id}})
        const categorias = await Categories.findByPk(id);
        if(!categorias){
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
    const dados = req.body;
    await Categories.create(dados)
    .then( ()=>{
        return res.json({
            erro:false,
            mensagem: 'Categoria cadastrada com sucesso'
        });
    }).catch( (err)=>{
        return res.status(400).json({
            erro:true,
            mensagem: `Erro: Categoria não cadastrada... ${err}`

        })
    })
}
///////////ALTERAR/////////////
 exports.update= async (req, res) => {
    const { id } = req.body;

    await Categories.update(req.body, {where: {id}})
    .then(() => {
        return res.json({
            erro:false,
            mensagem: 'Categoria alterado com sucesso!'
        })
    }).catch( (err) =>{
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: Categoria não alterado ...${err}`
        })
    })
}
////////////DELETAR/////////////////
exports.delete= async (req, res) => {
    const { id } = req.params;
    await Categories.destroy({ where: {id}})
    .then( () => {
        return res.json({
            erro: false,
            mensagem: "Categoria apagado com sucesso!"
        })
    }).catch( (err) =>{
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err} Categoria não apagado...`
        })
    })
}

