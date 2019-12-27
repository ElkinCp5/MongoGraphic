import {axios as Axios} from '../../utils';

class Auth{
    signin =(input)=>{
        let {email, password} = input;
        return Axios.post(
            'auth/signin',
            { email, password });
    };
    signup = (input)=>{
        let {name, email, password} = input;
        return Axios.post(
            'auth/signup',
            { name, email, password })
            .catch(err=>{
                console.error('auth error: service sign up:= ', err);
            });
    };
    signout = (input)=>{
        let {_id, email} = input;
        return Axios.post(
            'auth/signout',
            { _id, email })
            .catch(err=>{
                console.error('auth error: service sign out:= ', err);
            });
    };
    update = (input)=>{
        let {_id, email} = input;
        return input;
    };

    delete = (input)=>{
        let {_id, email} = input;
        return input;
    };
}

export default new Auth();