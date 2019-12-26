import Axios from '../utils/axios.config';

export default {
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
        signin: (data)=>{
            console.log(data);
            
            let {email, password} = data;
            return Axios.post(
                'auth',
                {
                    email,
                    password
                }
            ).the(res=>{
                return {
                    data: res.data,
                    success: res.message,
                    error: res.error
                };
            }).cath(err=>{
                return{
                    data: false,
                    success: false,
                    error: err
                };
            })
        },
        signup: async(data)=>{

        },
        signout: async(data)=>{

        },
        update: async(data)=>{

        },
        delete: async(data)=>{

        }
    }
}