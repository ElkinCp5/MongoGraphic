//Load app dependencies  
import Morgan               from 'morgan'; 
import Graphic              from "../dependencies";
import RoutesDocument       from '../routes/routes-graphic-document';
import RoutesModel          from '../routes/routes-graphic-model';
import RoutesAuth           from '../auth/router/route.auth';
import LoadingSchemas       from '../schema/loadinSchemaJson';
import SpecialFunction      from '../other/specialFunctions';
import NodePath             from 'path';
import Path                 from '../root';
import Cors                 from 'cors';
import Config               from '../config';

// Cargamos los módulos de express y body-parser
const Serve         = Graphic.Express();
const exJson        = Graphic.Express;
const Static        = Graphic.Express.static;
const BodyParser    = Graphic.Express.urlencoded;
const Inflection    = Graphic.Inflection;

const _LoadSchema       = new LoadingSchemas;
const _Path             = new Path;
const _SpecialFunction  = new SpecialFunction

Serve.use(BodyParser({extended:false}));
Serve.use(exJson.json());
Serve.use(Morgan('dev'));

// Rutas para los diferenctes apartado
//Cors(this.Config.parametersCors)
Serve.use(Cors(Config.parametersCors));
Serve.use('/api/auth/',  RoutesAuth);
Serve.use((req, res, next) =>{
    let document = _SpecialFunction.extractParameter(Inflection.singularize(req.path), '/api/documents/', 0);
        //console.log('Provar ', document);
    if(_Path.exists(document)){
        Serve.use('/api/documents/', RoutesDocument(_LoadSchema.singleSchema(document)));
    }
    next(); // pass control to the next handler
});
Serve.use('/api/models/', RoutesModel);
// Archivos estaticos del sistema
Serve.use(Static(NodePath.join(__dirname, '../public')));
//console.log(NodePath.join(__dirname, '../public'));

module.exports = Serve;



