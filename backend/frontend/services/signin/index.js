import Axios from '../../utils/axios.config';
class auth{
    signin(input){
        let {email, password} = input;
        return Axios.post(
            'auth/signin',
            { email, password });
    };

    signup(input){
        let {name, email, password} = input;
        return Axios.post(
            'auth/signup',
            { name, email, password });
    };

    signout(input){
        let {_id, email} = input;
        return Axios.post(
            'auth/signout',
            { _id, email });
    };

    update(data){

    }

    delete(data){

    }
}

export default new auth();