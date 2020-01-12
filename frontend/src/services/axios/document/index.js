import Axios from '../../config.axios';
import SessionStorage from '../../storage/session';

const dataResponse = (documents = [], message = undefined)=>{
    return {
        documents,
        message: message
    }
}

const index = async(name) =>{
    try {
        let rep = await Axios.get(`documents/${name}`).then(
            response=>{
                let { data } = response.data;
                let { error } = response.data;
                let { message } = response.data;
                let msg = message || error;
                return dataResponse(data, msg);

            }).catch(err =>{
                console.error('error in the response of the axios documents process service:=> ', err);
                let error = err.toString();
                return dataResponse(false, error);
            });
        console.log('axios documents:=> ', rep);
        return rep;
    } catch (err) {
        console.error('Error executing service axios documents process::=> ', err);
        let error = err.toString();
        return dataResponse(false, error);
    }

}

export default {
    index,
}