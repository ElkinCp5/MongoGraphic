'use strict'
// Cargamos el módulo de express para poder crear rutas
const Graphic   = require("../../dependencies")();
// Cargamos el controlador
var ctrlAuth = require('../controllers/user');
// Llamamos al router
var Router = Graphic.Express.Router();
var middlewaresAuth = require('../../middlewares/authenticated');
// Creamos una ruta para los métodos que tenemos en nuestros controladores
Router.get('/user/:id', middlewaresAuth.ensureAuth, ctrlAuth.getAuth);
// Exportamos la configuración
module.exports = Router;