//Load app dependencies  
import Morgan               from 'morgan';
import Passport             from 'passport';
import Graphic              from "../dependencies";
import RoutesDocument       from '../routes/routes-graphic-document';
import RoutesModel          from '../routes/routes-graphic-model';
import RoutesAuth           from '../auth/router/route.auth';
import SpecialFunction      from '../other/specialFunctions';
import Path                 from '../root';
import Configs              from '../config';
import Flash                from 'connect-flash';
import MethodOverride       from 'method-override';

import Webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackConfig from '../../webpack.config';
// Cargamos los módulos de express y body-parser
const Serve         = Graphic.Express();
const exJson        = Graphic.Express;
const Static        = Graphic.Express.static;
const BodyParser    = Graphic.Express.urlencoded;
const Inflection    = Graphic.Inflection;
const Cors          = Graphic.Cors;
const Session       = Graphic.Session;
const NewPath       = new Path('/public/');

Serve.use(exJson.json());
Serve.use(BodyParser({extended:false}));
Serve.use(Morgan('dev'));
//Serve.use(Cors(Config.parametersCors));
Serve.use(MethodOverride('X-HTTP-Method-Override'));
Serve.use(Static(NewPath.folder()));
Serve.use(WebpackDevMiddleware(Webpack(WebpackConfig)))
//
require('../auth/config/passport');
Serve.use(Session({
    secret: Configs.secret,
    resave: false,
    saveUninitialized: false,
    cookie : {
        maxAge: 604800000 //7 days in miliseconds
    }
}));
Serve.use(Flash());
Serve.use(Passport.initialize());
Serve.use(Passport.session());

// Rutas para los diferenctes apartado
Serve.use((req, res, next)=>{
    Serve.locals.msgBox = {
        email: req.flash('signupEmail'),
        password: req.flash('signupPassword')
    };
    next();
});
Serve.use('/api/models/', RoutesModel);
Serve.use('/api/auth/',  RoutesAuth);
Serve.use('/api/documents/',  RoutesDocument);
Serve.get('*', async(req, res) => {
    let root_frontend = await NewPath.exists('index', '.html');
    //console.log('Hola soy el frontend: ', root_frontend);
     res.sendFile(root_frontend);
});

module.exports = Serve;



