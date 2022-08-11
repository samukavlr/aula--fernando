const usersRoutes = require('express').Router();
const users = require('../controllers/users.controllers')

usersRoutes.get('/all',users.findAll)
usersRoutes.get('/show/:id',users.findOne)
usersRoutes.post('/create',users.create)
usersRoutes.put('/update',users.update)
usersRoutes.delete('/delete/:id',users.delete)
usersRoutes.post('/login',users.login)



module.exports = usersRoutes