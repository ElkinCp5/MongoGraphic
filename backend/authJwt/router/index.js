'use strict'
// Cargamos el módulo de express para poder crear rutas
const Graphic              = require("../../dependencies");
const middlewares = require('../../middlewares');
// Cargamos el controlador
const { 
    index,
    show,
    signin, 
    signup,
    verifyReset,
    verifyUpdate,
    verifyAccount,
    verifyToken
} = require('../controllers');
let Router = Graphic.Router;
// Creamos una ruta para los métodos que tenemos en nuestros controladores
//Router.get('/user/:id', middlewaresAuth.ensureAuth, ctrlAuth.getAuth);
Router.get('/',         middlewares.accountAuth, index);
Router.get('/account',  middlewares.accountAuth, show);
Router.post('/signin',  signin);
Router.post('/signup',  signup);

Router.get('/email/verify/:verifyToken',    middlewares.verificationAuth, verifyUpdate);
Router.post('/verify/reset',                middlewares.accountAuth, verifyReset);
Router.post('/verify/account',              middlewares.accountAuth, verifyAccount);
Router.post('/verify/token',                middlewares.accountAuth, verifyToken);
// Exportamos la configuración

module.exports = Router;