//Load app dependencies  
const Morgan            = require('morgan'); 
const Graphic           = require("../dependencies");
const RoutesDocument    = require('../routes/routes-graphic-document');
const RoutesModel       = require('../routes/routes-graphic-model');
const RoutesAuth        = require('../auth/router/route.auth');
this.LoadingSchemas     = require('../schema/loadinSchemaJson');
this.SpecialFunction    = require('../other/specialFunctions');
this.NodePath           = require('path');
this.Path               = require('../root');

// Cargamos los módulos de express y body-parser
const Serve         = Graphic.Express();
const exJson          = Graphic.Express;
const Static        = Graphic.Express.static;
const BodyParser    = Graphic.Express.urlencoded;
const Inflection    = Graphic.Inflection;

const _LoadSchema       = new this.LoadingSchemas;
const _Path             = new this.Path;
const _SpecialFunction  = new this.SpecialFunction

Serve.use(BodyParser({extended:false}));
Serve.use(exJson.json());
Serve.use(Morgan('dev'));

// Rutas para los diferenctes apartado
Serve.use('/api/auth/', RoutesAuth);
Serve.use((req, res, next) =>{
    var document = _SpecialFunction.extractParameter(Inflection.singularize(req.path), '/api/documents/', 0);
    console.log('Provar ', document)
    if(_Path.exists(document)){
        Serve.use('/api/documents/',RoutesDocument(_LoadSchema.singleSchema(document)));
    }
    next(); // pass control to the next handler
});
Serve.use('/api/models/', RoutesModel);
// Archivos estaticos del sistema
Serve.use(Static(this.NodePath.join(__dirname, '../public')));
//console.log(this.NodePath.join(__dirname, '../public'));

module.exports = Serve;



