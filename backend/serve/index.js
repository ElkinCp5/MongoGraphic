//Load app dependencies  
import Morgan               from 'morgan';
import Graphic              from "../dependencies";
import RoutesDocument       from '../routes/routes-graphic-document';
import RoutesModel          from '../routes/routes-graphic-model';
import RoutesAuthJWT        from '../authJwt/router';
import Path                 from '../root';
import MethodOverride       from 'method-override';
import engineRender         from 'ejs';

import Webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackConfig from '../../webpack.config';
// Cargamos los módulos de express y body-parser
const Server        = Graphic.Express();
const exJson        = Graphic.Express;
const Static        = Graphic.Express.static;
const BodyParser    = Graphic.Express.urlencoded;
const Cors          = Graphic.Cors;
const NewPath       = new Path('/public/');
const RenderFile    = engineRender.renderFile;

Server.use(exJson.json());
Server.use(BodyParser({extended:false}));
Server.use(Morgan('dev'));
//Server.use(Cors(Config.parametersCors));
Server.use(Cors());
Server.use(MethodOverride('X-HTTP-Method-Override'));
Server.use(Static(NewPath.folder()));
//Server.use(WebpackDevMiddleware(Webpack(WebpackConfig)))

Server.set('views', NewPath.folder());
Server.engine('html', RenderFile);
Server.set('view engine', 'html');
// Rutas para los diferenctes apartado

Server.use('/api/auth/',   RoutesAuthJWT);
Server.use('/api/models/', RoutesModel);
Server.use('/api/documents/',  RoutesDocument);
Server.get('*', async(req, res) => {
     res.render('index.html');
});

module.exports = Server;

