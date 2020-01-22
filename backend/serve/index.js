//Load app dependencies  
const Morgan               = require('morgan');
const Graphic              = require("../dependencies");
const RoutesDocument       = require('../routes/routes-graphic-document');
const RoutesSchema         = require('../routes/routes-graphic-schema');
const RoutesAuthJWT        = require('../authJwt/router');
const Path                 = require('../root');
const MethodOverride       = require('method-override');
const engineRender         = require('ejs');

const Webpack = require('webpack');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackConfig = require('../../webpack.config');
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
Server.use(WebpackDevMiddleware(Webpack(WebpackConfig)))

Server.set('views', NewPath.folder());
Server.engine('html', RenderFile);
Server.set('view engine', 'html');
// Rutas para los diferenctes apartado

Server.use('/api/auth/',   RoutesAuthJWT);
Server.use('/api/models/', RoutesSchema);
Server.use('/api/documents/',  RoutesDocument);
Server.get('*', async(req, res) => {
     res.render('index.html');
});

module.exports = Server;

