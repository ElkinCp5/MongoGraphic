export default {    
    host:{
        serve: process.env.SERVER_LOCAL || 'http://localhost:',
        port:  process.env.PORT_LOCAL || 8080
    },
    patch:{
        models: process.env.PATCH_MODELS || '../models/',
        schemas: process.env.PATCH_SCHEMAS || '../schemas/'
    }
}