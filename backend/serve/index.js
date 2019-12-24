//Load app dependencies  
import Morgan               from 'morgan'; 
import Graphic              from "../dependencies";
import RoutesFrontend       from "../routes/routes-forntend"
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
const _path_            = new Path('/public/');
const _SpecialFunction  = new SpecialFunction

Serve.use(BodyParser({extended:false}));
Serve.use(exJson.json());
Serve.use(Morgan('dev'));
Serve.use(Cors(Config.parametersCors));
Serve.use(Static(_path_.folder()));

// Rutas para los diferenctes apartado
Serve.use('/api/models/', RoutesModel);
Serve.use('/api/auth/',  RoutesAuth);
Serve.use((req, res, next) =>{
    let document = _SpecialFunction.extractParameter(Inflection.singularize(req.path), '/api/documents/', 0);
        console.log('Provar ', document);
    if(_Path.exists(document)){
        Serve.use('/api/documents/', RoutesDocument(_LoadSchema.singleSchema(document)));
    }
    next(); // pass control to the next handler
});
let index = async(req, res) => {
    let root_frontend = _path_.exists('index', '.html');
    //console.log('Hola soy el frontend: ', root_frontend);
    res.sendFile(root_frontend);
};
Serve.use('/dashboard', index);
// Archivos estaticos del sistema

//console.log(NodePath.join(__dirname, '../public'));

module.exports = Serve;



