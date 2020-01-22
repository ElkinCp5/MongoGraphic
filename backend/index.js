// Load moduele for dependencies 
const { Mongoose }          = require("./dependencies");
// load moduele for config connect mongoDB
const { moongodb, host }    = require('./config');
const TestConfigs           = require('./connect');
// Requerimos el servidor configurado con express
const Server      = require('./serve');
const UrlConnect  = moongodb.uriDB;
                       
// Connection object of mongoose
const ObjetConnection   = Mongoose.connection;
const OptionsConnect    = moongodb.options;

// Configuracion asincrona de la conección de mongoDB
Mongoose.Promise = global.Promise;
async function connectAsync(Url, Options){
   await Mongoose.connect(Url, Options);
}

connectAsync(UrlConnect, OptionsConnect).then(() => {
    //Iniciamos la conección a mongoDB de forma asincrona;
    Server.listen(host.port, () => {
        console.warn(`node server running on: ${host.serve}${host.port}/api/models`);
        //Mostramos por consola la ruta del servidor;
    });
})
// Cacturamos cual quier error que ocurra en la conección a mongodb
.catch(error => console.error(error));
// Módulo de gestión de eventos en la colección mongodb
TestConfigs(UrlConnect, ObjetConnection);
