//Load app dependencies  
const Graphic   = require("../dependencies")();
const Morgan    = require('morgan'); 
const RoutesM   = require('../routes');
const RoutesG   = require('../routes/routes-graphic');
//const RoutesU   = require('../auth/route/user');
// Cargamos los módulos de express y body-parser
var Serve = Graphic.Express();
var BodyParser = Graphic.BodyParser;


Serve.use(BodyParser.urlencoded({extended:false}));
Serve.use(BodyParser.json());
Serve.use(Morgan('dev'));
//Serve.use('/api', Route);
// exportamos este módulo para poder usar la variable app fuera de este archivo

var Parameters = {
    model:{
        url: '',
        name: {
            singular: 'person',
            plural: 'people'
        }
    }
};


//RoutesG(Serve);
//Serve.use('/api', RoutesU);
RoutesG(Serve);
RoutesM(Serve, Parameters);
//console.log(__dirname);
module.exports = Serve;



