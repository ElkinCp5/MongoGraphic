import Axios from '../../config.axios';
import SessionStorage from '../../storage/session';

const dataResponse = (collections = [], message = undefined)=>{
    return {
        collections,
        message: message
    }
}

const index = async() =>{
    try {
        let rep = await Axios.get(`models`).then(
            response=>{
                let { data } = response.data;
                let { error } = response.data;
                let { message } = response.data;
                let msg = message || error;
                return dataResponse(data, msg);

            }).catch(err =>{
                console.error('error in the response of the axios collections process service:=> ', err);
                let error = err.toString();
                return dataResponse([], error);
            });
        console.log('axios collections:=> ', rep);
        return rep;
    } catch (err) {
        console.error('Error executing service axios collections process::=> ', err);
        let error = err.toString();
        return dataResponse([], error);
    }
}

export default {
    index,
}