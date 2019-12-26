import Axios from '../../utils/axios.config';
class auth{
    signin(input){
        let {email, password} = input;
        return Axios.post(
            'auth/signin',
            {
                email,
                password
            }
        ).cath(err=>{
            console.error(err); 
        })
    };

    signup(data){

    }

    signout(data){

    }

    update(data){

    }

    delete(data){

    }
}

export default new auth();