// Utilizar funcionalidades del Ecmascript 6
'use strict'
// load moduele for dependencies 
const Graphic   = require("./dependencies")();
// load moduele for config connect mongoDB
const Configs   = require('./config')();
const TestConfigs   = require('./connect');
// load fil app.js the config for Express
const Serve       = require('./serve');
const Port        = Configs.host.port;
const UrlConnect  = Configs.moongodb.manager+
                    Configs.moongodb.serve+
                    Configs.moongodb.port+
                    Configs.moongodb.database;

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

Graphic.Mongoose.Promise = global.Promise;
async function ConnectAsync(){
   await Graphic.Mongoose.connect(UrlConnect, OptionsConnect);
}

Serve.listen(Port, () => {
    console.warn('servidor corriendo en http://localhost:'+Port);
});
/*
ConnectAsync().then(() => {
    console.log("La conexión a db realizada");
    Serve.listen(Port, () => {
        console.warn('servidor corriendo en http://localhost:'+Port);
    });
})
// Si no se conecta correctamente escupimos el error
.catch(err => console.error(err));

TestConfigs(Graphic.Mongoose.connection);
*/