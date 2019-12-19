module.exports = {    
    moongodb:{
        manager:'mongodb://',
        serve: "localhost:",
        database: "local",
        port: "27017/",
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
        serve: "localhost/",
        port: (process.env.PORT || 8080)
    },
    patch:{
        models: "../schemas/",
        schemas: "../models/"
    },
    secret: 'SXw{2WMaL}I1hL1ZDG^I'
}