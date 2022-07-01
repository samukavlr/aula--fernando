const Products = require('../models/Products')
const Categories= require('../models/Categories')


////// LISTA /////////
exports.findAll= async (req, res) =>{
    await Products.findAll({
        attributes: ['id','categorieId', 'name', 'description','quantity','price', ],
        order:[['name', 'ASC']],
        include:[Categories]
    })
    .then( (produtos) =>{
        return res.json({
            erro: false,
            produtos
        });
    }).catch( (err) => {
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err} ou Nenhuma Produto Encontrada!!!`
        })
    })

}
/////// MOSTRAR 1/////
exports.findOne= async (req, res) => {
    const { id } = req.params;
    try {
        // await Categories.findAll({ where: {id: id}})
        // const produtos = await Products.findByPk(id);
        const produtos = await Products.findAll({
            where:{id:id},
            include:[Categories]
        })
        if(!produtos){
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum produto encontrado!"
            })
        }
        res.status(200).json({
            erro:false,
            produtos
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
    await Products.create(dados)
    .then( ()=>{
        return res.json({
            erro:false,
            mensagem: 'Pruduto cadastrado com sucesso'
        });
    }).catch( (err)=>{
        return res.status(400).json({
            erro:true,
            mensagem: `Erro: Produto não cadastrada... ${err}`

        })
    })
}
///////////ALTERAR/////////////
exports.update= async (req, res) => {
    const { id } = req.body;

    await Products.update(req.body, {where: {id}})
    .then(() => {
        return res.json({
            erro:false,
            mensagem: 'Produto alterado com sucesso!'
        })
    }).catch( (err) =>{
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: Produto não alterado ...${err}`
        })
    })
}
////////////DELETAR/////////////////
exports.delete= async (req, res) => {
    const { id } = req.params;
    await Products.destroy({ where: {id}})
    .then( () => {
        return res.json({
            erro: false,
            mensagem: "Produto apagado com sucesso!"
        })
    }).catch( (err) =>{
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err} Produto não apagado...`
        })
    })
}
