module.exports = ()=>{
    return {    
        moongodb:{
            manager:'mongodb://',
            serve: "localhost:",
            database: "local",
            port: "27017/"
        },
        host:{
            serve: "localhost/",
            port: (process.env.PORT || 8080)
        },
        patch:{
            models: "../schemas/",
            schemas: "../models/"
        },
        secret: 'clave_secreta_'
    }
};