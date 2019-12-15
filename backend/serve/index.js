//Load app dependencies  
const Morgan            = require('morgan'); 
const Graphic           = require("../dependencies")();
const RoutesDocument    = require('../routes/routes-graphic-document');
const RoutesModel       = require('../routes/routes-graphic-model');
this.LoadingSchemas    = require('../schema/loadinSchemaJson');
this.Path               = require('../root');
this.SpecialFunction    = require('../other/specialFunctions');

// Cargamos los módulos de express y body-parser
const Serve         = Graphic.Express();
const BodyParser    = Graphic.BodyParser;
const Inflection    = Graphic.Inflection;

const _LoadSchema       = new this.LoadingSchemas;
const _Path             = new this.Path;
const _SpecialFunction  = new this.SpecialFunction

Serve.use(BodyParser.urlencoded({extended:false}));
Serve.use(BodyParser.json());
Serve.use(Morgan('dev'));
Serve.use(function (req, res, next) {
    var path = _SpecialFunction.extractParameter(Inflection.singularize(req.path), '/api/document/', 0);
        //console.log('Provar ', path)
    if(_Path.exists(path)){
        RoutesDocument(Serve, _LoadSchema.singleSchema(path))
    }else if(!path){
        //RoutesDocument(Serve, _LoadSchema.singleSchema(path))
    }
    next(); // pass control to the next handler
});
RoutesModel(Serve);
//console.log(__dirname);
module.exports = Serve;



