//Load app dependencies  
import Morgan               from 'morgan';
import Passport             from 'passport';
import Graphic              from "../dependencies";
import RoutesDocument       from '../routes/routes-graphic-document';
import RoutesModel          from '../routes/routes-graphic-model';
import RoutesAuth           from '../auth/router';
import SpecialFunction      from '../other/specialFunctions';
import Path                 from '../root';
import Configs              from '../config';
import Flash                from 'connect-flash';
import MethodOverride       from 'method-override';
import engineRender         from 'ejs';

import Webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackConfig from '../../webpack.config';
// Cargamos los módulos de express y body-parser
const Server         = Graphic.Express();
const exJson        = Graphic.Express;
const Static        = Graphic.Express.static;
const BodyParser    = Graphic.Express.urlencoded;
const Inflection    = Graphic.Inflection;
const Cors          = Graphic.Cors;
const Session       = Graphic.Session;
const NewPath       = new Path('/public/');
const RenderFile    = engineRender.renderFile;
Server.use(exJson.json());
Server.use(BodyParser({extended:false}));
Server.use(Morgan('dev'));
//Server.use(Cors(Config.parametersCors));
Server.use(MethodOverride('X-HTTP-Method-Override'));
Server.use(Static(NewPath.folder()));
Server.use(WebpackDevMiddleware(Webpack(WebpackConfig)))
//
require('../auth/passport/passport');
Server.use(Session({
    secret: Configs.secret,
    resave: false,
    saveUninitialized: false,
    cookie : {
        maxAge: 604800000 //7 days in miliseconds
    }
}));
Server.use(Flash());
Server.use(Passport.initialize());
Server.use(Passport.session());
/*Server.set('views', NewPath.folder());
Server.engine('html', RenderFile);
Server.set('view engine', 'html');*/
// Rutas para los diferenctes apartado
Server.use((req, res, next)=>{
    Server.locals.msgBox = {
        email: req.flash('signupEmail'),
        password: req.flash('signupPassword')
    };
    next();
});
Server.use('/api/models/', RoutesModel);
Server.use('/api/auth/',  RoutesAuth);
Server.use('/api/documents/',  RoutesDocument);
Server.get('*', async(req, res) => {
    let root_frontend = await NewPath.exists('index', '.html');
    res.sendFile(root_frontend);
    //console.log('Hola soy el frontend: ', root_frontend);
     //res.render('index.html');
});

module.exports = Server;



