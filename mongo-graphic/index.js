// Utilizar funcionalidades del Ecmascript 6
'use strict'
// load moduele for dependencies 
const Graphic   = require("./dependencies")();
// load moduele for config connect mongoDB
const Configs   = require('./config')();
// load fil app.js the config for Express
var Serve       = require('./serve');
var Port        = Configs.host.port;
var Connect =   Configs.moongodb.manager+
                Configs.moongodb.serve+
                Configs.moongodb.port+
                Configs.moongodb.database;
// Le indicamos a Mongoose que haremos la conexión con Promesas
Graphic.Mongoose.Promise = global.Promise;
// Usamos el método connect para conectarnos a nuestra base de datos
Graphic.Mongoose.connect(Connect,  { useMongoClient: true})
    .then(() => {
        // Cuando se realiza la conexión, lanzamos este mensaje por consola
        console.log("La conexión a db realizada")
        // CREAR EL SERVIDOR WEB CON NODEJS
        Serve.listen(Port, () => {
            console.log('servidor corriendo en http://localhost:'+Port);
        });
    })
    // Si no se conecta correctamente escupimos el error
    .catch(err => console.log(err));