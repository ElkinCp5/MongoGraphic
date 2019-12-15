//Load app dependencies  
const Morgan            = require('morgan'); 
const Graphic           = require("../dependencies")();
const RoutesDocument    = require('../routes/routes-graphic-document');
const RoutesModel       = require('../routes/routes-graphic-model');
const Rmodel = require('../routes/routes-graphic-model/model.routes');
this.LoadingSchemas     = require('../schema/loadinSchemaJson');
this.SpecialFunction    = require('../other/specialFunctions');
this.NodePath           = require('path');
this.Path               = require('../root');

// Cargamos los módulos de express y body-parser
const Serve         = Graphic.Express();
const Json          = Graphic.Express.json;
const Static        = Graphic.Express.static;
const BodyParser    = Graphic.BodyParser;
const Inflection    = Graphic.Inflection;

const _LoadSchema       = new this.LoadingSchemas;
const _Path             = new this.Path;
const _SpecialFunction  = new this.SpecialFunction

//Serve.use(BodyParser.urlencoded({extended:false}));
Serve.use(Json());
Serve.use(Morgan('dev'));

// Rutas para los diferenctes apartado
Serve.use('/api/models/', RoutesModel);
// Archivos estaticos del sistema
Serve.use(Static(this.NodePath.join(__dirname, '../public')));
//console.log(this.NodePath.join(__dirname, '../public'));
/*
Serve.use((req, res, next) =>{
    var document = _SpecialFunction.extractParameter(Inflection.singularize(req.path), '/api/document/', 0);
        //console.log('Provar ', path)
    if(_Path.exists(document)){
        RoutesDocument(Serve, _LoadSchema.singleSchema(document))
    }
    next(); // pass control to the next handler
});*/
//console.log(__dirname);
module.exports = Serve;



