// Load moduele for dependencies 
//import Open                 from 'open';
const {Mongoose}            = require("./dependencies");
// load moduele for config connect mongoDB
const { moongodb, host }    = require('./config');
const TestConfigs           = require('./connect');
// Configuration file upload Express
const Server      = require('./serve');
const ServerNode  = host.serve;
const Port        = host.port;
const UrlConnect  = moongodb.manager+
                    moongodb.host+
                    moongodb.port+
                    moongodb.database;
            
                    
// Connection object of mongoose
const ObjetConnection   = Mongoose.connection;
const OptionsConnect    = moongodb.options;
// Mongodb async connection configuration
Mongoose.Promise = global.Promise;
async function connectAsync(Url, Options){
   await Mongoose.connect(Url, Options);
}

connectAsync(UrlConnect, OptionsConnect).then(() => {
    console.log("initialized mongodb connection");
    Server.listen(Port, () => {
        console.warn(`node server running on: ${ServerNode}${Port}/api/models`);
        //process.env.NODE_ENV !='production' ? Open(`${ServerNode}${Port}/`): null ;
    });
})
// Error capture in the mongodb collection
.catch(error => console.error(error));
// Event management module in the mongodb collection
TestConfigs(UrlConnect, ObjetConnection);
