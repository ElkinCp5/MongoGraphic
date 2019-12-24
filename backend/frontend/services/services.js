const axios = require('axios');
const constants = require('../utils/Api');
console.log('constants', constants.URL_BASE);

module.exports = {
    models: {
        all: async()=>{

        },
        show: async(name, id)=>{

        },
        create: async(name, user)=>{

        },
        update: async(name, id)=>{

        },
        delete: async(name, id)=>{

        }
    },
    documents:{
        all: async(name)=>{

        },
        show: async(name, id)=>{

        },
        create: async(name, user)=>{

        },
        update: async(name, id)=>{

        },
        delete: async(name, id)=>{

        }
    },
    auth:{
        signin: async(user)=>{

        },
        signup: async()=>{

        },
        signout: async()=>{

        },
        update: async()=>{

        },
        delete: async()=>{

        }
    }
}