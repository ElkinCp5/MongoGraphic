import {axios as Axios} from '../../utils';

const session = async(id) =>{
    const data = await Axios.post(`auth/${id}`)
    .catch(err=>{
        console.error('auth error: service session:= ', err);
    });
    console.log(data); 
}

const signin = async(email, password) =>{
    const { data } = await Axios.post('auth/signin', { 
        email, 
        password 
    }); 
    console.log(data);
}

const signup = async(name, email, password) =>{
    const { data } = await Axios.post('auth/signup', {
        name, 
        email, 
        password
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
    signup
}