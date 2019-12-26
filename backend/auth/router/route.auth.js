'use strict'
// Cargamos el módulo de express para poder crear rutas
import Graphic              from "../../dependencies";
import PassportConfig       from '../../auth/config/passport'
// Cargamos el controlador
var { 
    index,
    show,
    signin, 
    signup,
    logout 
} = require('../controllers/auth');
var Router = Graphic.Router;
var middlewaresAuth = require('../../middlewares/authenticated');
// Creamos una ruta para los métodos que tenemos en nuestros controladores
//Router.get('/user/:id', middlewaresAuth.ensureAuth, ctrlAuth.getAuth);
Router.get('/', PassportConfig.isAuth, index);
Router.get('/:id', PassportConfig.isAuth, show);
Router.post('/signin', PassportConfig.noAuth, signin);
Router.post('/signup', PassportConfig.noAuth, signup);
Router.post('/logout', PassportConfig.isAuth, logout)
// Exportamos la configuración

module.exports = Router;