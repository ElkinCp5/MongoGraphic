import Axios from '../../config.axios';
import SessionStorage from '../../storage/session'

const session =() =>{
    return Axios.get(`auth/account`).then(response=>{
        let { data } = response; 
        return data;
    })
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
        
        if(token != undefined && token != '' && token && data != undefined){
            data.token = undefined
            SessionStorage.setToken(token)
            SessionStorage.setAccount(JSON.stringify(data))
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

const signup =(name, email, password) =>{
    return Axios.post('auth/signup', {
        name, 
        email, 
        password
    }).then(response=>{
        let { data } = response.data;
        let { token } = data;
        let { error } = response.data;
        let { message } = response.data;
        let msg = message || error;
        console.log({signup: response.data});
        
        if(token != undefined && token != '' && token && data != undefined){
            data.token = undefined
            SessionStorage.setToken(token)
            SessionStorage.setAccount(data)
        }else{
            SessionStorage.out();
        }
        return {
            user: data,
            message: msg
        }
    }); 
}

const verifyAccount = () =>{
    return Axios.post('auth/verify-account').then(response=>{
        let { data } = response;
        return data
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
    session,
    signin,
    signup,
    verifyAccount,
    verifyToken
}