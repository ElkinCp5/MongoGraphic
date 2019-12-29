// Utilizar funcionalidades del Ecmascript 6
'use strict'
// Load moduele for dependencies 
import Open                 from 'open';
const Graphic   = require("./dependencies");
// load moduele for config connect mongoDB
const Configs   = require('./config');
const TestConfigs   = require('./connect');
// Configuration file upload Express
const Server       = require('./serve');
const ServerNode    = Configs.host.serve;
const Port        = Configs.host.port;
const UrlConnect  = Configs.moongodb.manager+
                    Configs.moongodb.serve+
                    Configs.moongodb.port+
                    Configs.moongodb.database;
// Connection object of mongoose
const ObjetConnection   = Graphic.Mongoose.connection;
const OptionsConnect    = Configs.moongodb.options;
// Mongodb async connection configuration
Graphic.Mongoose.Promise = global.Promise;
async function connectAsync(Url, Options){
   await Graphic.Mongoose.connect(Url, Options);
}

connectAsync(UrlConnect, OptionsConnect).then(() => {
    console.log("initialized mongodb connection");
    Server.listen(Port, () => {
        console.warn(`node server running on: ${ServerNode}${Port}/api/models`);
        process.env.NODE_ENV !='production' ? Open(`${ServerNode}${Port}/`): null ;
    });
})
// Error capture in the mongodb collection
.catch(error => console.error(error));
// Event management module in the mongodb collection
TestConfigs(UrlConnect, ObjetConnection);
