const originClient = process.env.ORIGIN_CLIENT;

module.exports = {    
    moongodb:{
        manager:process.env.BASE_MONGO,
        host: process.env.HOST_MONGO,
        database: process.env.DATE_BASE,
        port: process.env.PORT_MONGO,
        options: {
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
        }
    },
    host:{
        serve: process.env.SERVER_LOCAL,
        port:  process.env.PORT_LOCAL
    },
    patch:{
        models: process.env.PATCH_MODELS,
        schemas: process.env.PATCH_SCHEMAS
    },
    secret: process.env.TOKEN_SECRET,
    //Si no desea bloquear las herramientas REST o las solicitudes de servidor a servidor, agregue una !originmarca en la función de origen de la siguiente manera:
    //  if (whitelist.indexOf(origin) !== -1 || !origin)
    parametersCors: {
        origin: function(origin, callback){
            if (originClient.indexOf(origin) !== -1 || !origin) {
              callback(null, true)
            } else {
              callback(new Error('Not allowed by CORS'))
            }
        },
        methods: "GET, HEAD, PUT,PATCH ,POST, DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 200
    }
}