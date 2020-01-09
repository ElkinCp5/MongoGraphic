import Axios from '../../config.axios';
import SessionStorage from '../../storage/session'

const account =() =>{
    return Axios.get(`auth/account`).then(response=>{
        let { data } = response.data;
        let { error } = response.data;
        let { message } = response.data;
        let msg = message || error;
        console.log({account: response.data});
        
        return {
            user: data,
            message: msg
        }
    }).catch(err =>{
        console.error('Service axios signup Error:=> ', err);
    }); 
}

const signin = async (email, password) =>{
    return await Axios.post('auth/signin', JSON.stringify({email, password}))
    .then(response=>{
        let { data } = response.data;
        let { token } = data;
        let { error } = response.data;
        let { message } = response.data;
        let msg = message || error;
        console.log({signin: response.data});
        
        if(token != undefined && token && data != undefined){
            data.token = undefined;
            SessionStorage.setToken(token);
            SessionStorage.setAccount(JSON.stringify(data));
        }else{
            SessionStorage.out();
        }
        
        
        return {
            user: data,
            message: msg
        }
    }).catch(err =>{
        console.error('Service axios signi Error:=> ', err);
    });
}

const signup = (email, password, name) =>{
    return Axios.post('auth/signup',  JSON.stringify({email, password, name}) )
    .then(response=>{
        let { data } = response.data;
        let { token } = data;
        let { error } = response.data;
        let { message } = response.data;
        let msg = message || error;
        console.log({signup: response.data});
        
        if(token != undefined && token != '' && token && data != undefined){
            data.token = undefined;
            SessionStorage.setToken(token);
            SessionStorage.setAccount(JSON.stringify(data));
        }else{
            SessionStorage.out();
        }
        return {
            user: data,
            message: msg
        }
    }).catch(err =>{
        console.error('Service axios signup Error:=> ', err);
    }); 
}

const verify = () =>{
    return Axios.post('auth/verify/account').then(response=>{
        let { data } = response.data;
        let { token } = data;
        let { error } = response.data;
        let { message } = response.data;
        let msg = message || error;
        console.log({verifyAccount: response.data});
        
        if(token &&  data){
            data.token = undefined;
            SessionStorage.out();
            SessionStorage.setToken(token);
            SessionStorage.setAccount(JSON.stringify(data));
        }
        return {
            user: data,
            message: msg
        }
    }).catch(err =>{
        console.error('Service axios verify account Error:=> ', err);
    });  
}

const reset = () =>{
    return Axios.post('auth/verify/reset').then(response=>{
        let { data } = response.data;
        let { error } = response.data;
        let { message } = response.data;
        let msg = message || error;
        console.log({verifyReset: response.data});
        
        return {
            user: data,
            message: msg
        }
    }).catch(err =>{
        console.error('Service axios verify reset Error:=> ', err);
    });  
}

const verifyToken = async() =>{
    return Axios.post('auth/verify-token').then(response=>{
        let { data } = response;
        return data
    }); 
}

const signout = async() =>{
    const { data } = await Axios.post('auth/signout');
}

const update = async() =>{
    const { data } = await Axios.post('auth/signout');
}

const destroy = async() =>{
    const { data } = await Axios.post('auth/signout');
}

export default {
    account,
    signin,
    signup,
    reset,
    verify,
    verifyToken
}