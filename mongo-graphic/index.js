// Utilizar funcionalidades del Ecmascript 6
'use strict'
// Load moduele for dependencies 
const Graphic   = require("./dependencies")();
// load moduele for config connect mongoDB
const Configs   = require('./config')();
const TestConfigs   = require('./connect');
// Configuration file upload Express
const Serve       = require('./serve');
const Port        = Configs.host.port;
const UrlConnect  = Configs.moongodb.manager+
                    Configs.moongodb.serve+
                    Configs.moongodb.port+
                    Configs.moongodb.database;
// Connection object of mongoose
const ObjetConnection = Graphic.Mongoose.connection;
const OptionsConnect = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 30000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};
// Mongodb async connection configuration
Graphic.Mongoose.Promise = global.Promise;
async function connectAsync(){
   await Graphic.Mongoose.connect(UrlConnect, OptionsConnect);
}

connectAsync().then(() => {
    console.log("initialized mongodb connection");
    Serve.listen(Port, () => {
        console.warn(`node server running on: http://localhost:${Port}`);
    });
})
// Error capture in the mongodb collection
.catch(error => console.error(error));
// Event management module in the mongodb collection
TestConfigs(ObjetConnection, UrlConnect);
