//Load app dependencies  
const Graphic   = require("../dependencies")();
const Morgan    = require('morgan'); 
const RoutesM   = require('../routes');
const RoutesG   = require('../routes/routes-graphic');
const LoadingSchemas = require('../schema/loadinSchemaJson');
//const RoutesU   = require('../auth/route/user');
// Cargamos los módulos de express y body-parser
const Serve = Graphic.Express();
const BodyParser = Graphic.BodyParser;
const Inflection = Graphic.Inflection;
const LoadSchema = new LoadingSchemas;
var path = '';

Serve.use(BodyParser.urlencoded({extended:false}));
Serve.use(BodyParser.json());
Serve.use(Morgan('dev'));
Serve.use(function (req, res, next) {
    path = Inflection.singularize((req.path).replace('/api/', '').split('/')[0])
    if(LoadSchema.existsSchema(path)){
        req.path.indexOf('/api/', 0) >= 0 ? 
            RoutesM(Serve, LoadSchema.singleSchema(path)[path])
        : '' ;
    }
    //res.json(LoadSchema.listsSchema(path)[path])
    //res.json(req.path.indexOf('/manager/', 0))
    next(); // pass control to the next handler
});

RoutesG(Serve);
//console.log(__dirname);
module.exports = Serve;



