'use strict'
// Cargamos el módulo de express para poder crear rutas
const Graphic   = require("../../dependencies")();
// Cargamos el controlador
var { 
    index,
    show, 
    register, 
    login, 
    signup 
} = require('../controllers/auth');
var Router = Graphic.Router;
var middlewaresAuth = require('../../middlewares/authenticated');
// Creamos una ruta para los métodos que tenemos en nuestros controladores
//Router.get('/user/:id', middlewaresAuth.ensureAuth, ctrlAuth.getAuth);
Router.get('/', index);
Router.get('/:id', show);
Router.post('/login', login);
Router.post('/signup', signup);
Router.post('/register', register);
// Exportamos la configuración

module.exports = Router;