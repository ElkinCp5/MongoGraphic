'use strict'
// Cargamos el módulo de express para poder crear rutas
import Graphic              from "../../dependencies";
// Cargamos el controlador
var { 
    index,
    show,
    signin, 
    signup,
    signout 
} = require('../controllers');
var Router = Graphic.Router;
var middlewaresAuth = require('../../middlewares/authenticated');
// Creamos una ruta para los métodos que tenemos en nuestros controladores
//Router.get('/user/:id', middlewaresAuth.ensureAuth, ctrlAuth.getAuth);
Router.get('/', middlewaresAuth.accountAuth, index);
Router.get('/account', middlewaresAuth.accountAuth, show);
Router.post('/signin', signin);
Router.post('/signup', signup);
Router.post('/signout', signout)
// Exportamos la configuración

module.exports = Router;