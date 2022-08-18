const router= require('express').Router();

////Rota de Categories/////
const categoriesRoutes=require('./categories.routes')
router.use('/categories',categoriesRoutes);


///Route in Users
const usersRoutes=require('./users.routes')
router.use('/users',usersRoutes);

module.exports= router;