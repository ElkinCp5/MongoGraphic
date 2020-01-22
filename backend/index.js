// Load moduele for dependencies 
//import Open                 from 'open';
const { Mongoose }          = require("./dependencies");
// load moduele for config connect mongoDB
const { moongodb, host }    = require('./config');
const TestConfigs           = require('./connect');
// Configuration file upload Express
const Server      = require('./serve');
const ServerNode  = host.serve;
const Port        = host.port;
const UrlConnect  = undefined
if(moongodb.database && moongodb.manager){
    UrlConnect  = moongodb.manager+
                    moongodb.host+
                    moongodb.port+
                    moongodb.database;
}else{
    UrlConnect = process.env.URI_DB 
}

                       
// Connection object of mongoose
const ObjetConnection   = Mongoose.connection;
const OptionsConnect    = moongodb.options;
// Mongodb async connection configuration
Mongoose.Promise = global.Promise;
async function connectAsync(Url, Options){
   await Mongoose.connect(Url, Options);
}

connectAsync(UrlConnect, OptionsConnect).then(() => {
    //console.log("initialized mongodb connection");
    Server.listen(Port, () => {
        console.warn(`node server running on: ${ServerNode}${Port}/api/models`);
        //process.env.NODE_ENV !='production' ? Open(`${ServerNode}${Port}/`): null ;
    });
})
// Cacturamos cual quier error que ocurra en la conección a mongodb
.catch(error => console.error(error));
// Módulo de gestión de eventos en la colección mongodb
TestConfigs(UrlConnect, ObjetConnection);
