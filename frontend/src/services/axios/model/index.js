import Axios from '../../config.axios';
import SessionStorage from '../../storage/session'

const index =() =>{
    return Axios.get(`models`).then(response=>{
        let { data } = response.data;
        let { error } = response.data;
        let { message } = response.data;
        let msg = message || error;
        console.log({account: response.data});
        
        return {
            collections: data,
            message: msg
        }
    }).catch(err =>{
        console.error('Service axios model all Error:=> ', err);
    }); 
}

export default {
    index,
}