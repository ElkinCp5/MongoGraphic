//Load app dependencies  
const Graphic   = require("../dependencies")();
const Morgan    = require('morgan'); 
const RoutesDocument   = require('../routes/routes-graphic-document');
const RoutesModel   = require('../routes/routes-graphic-model');
const LoadingSchemas = require('../schema/loadinSchemaJson');
//const RoutesU   = require('../auth/route/user');
// Cargamos los módulos de express y body-parser
const Serve = Graphic.Express();
const BodyParser = Graphic.BodyParser;
const Inflection = Graphic.Inflection;
const LoadSchema = new LoadingSchemas;

Serve.use(BodyParser.urlencoded({extended:false}));
Serve.use(BodyParser.json());
Serve.use(Morgan('dev'));
Serve.use(function (req, res, next) {
    var path = Inflection.singularize((req.path).replace('/api/document/', '').split('/')[0])
    //console.log('Provar ', JSON.stringify(LoadSchema.singleSchema('user')))
    if(LoadSchema.existsSchema(path)){
        req.path.indexOf('/api/document/', 0) >= 0 ?
            RoutesDocument(Serve, LoadSchema.singleSchema(path))
        : '' ;
    }
    //res.json(LoadSchema.listsSchema(path)[path])
    //res.json(req.path.indexOf('/manager/', 0))
    next(); // pass control to the next handler
});

RoutesModel(Serve);
//console.log(__dirname);
module.exports = Serve;



