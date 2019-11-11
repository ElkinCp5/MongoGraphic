'use strict'
// Cargamos el módulo de express para poder crear rutas
const Graphic   = require("../../dependencies")();
// Cargamos el controlador
var UserCtrl = require('../controllers/user');
// Llamamos al router
var Api = Graphic.Express.Router();
var Md_auth = require('../../middlewares/authenticated');
// Creamos una ruta para los métodos que tenemos en nuestros controladores
Api.get('/user/:id', Md_auth.ensureAuth, UserCtrl.getUser);
// Exportamos la configuración
module.exports = Api;