import Axios from '../../config.axios';
import SessionStorage from '../../storage/session';


const dataResponse = (collections = [], message = undefined)=>{
    return {
        collections,
        message: message
    }
}

const modelResponse = (structure = undefined, message = undefined, verbatim = undefined, name = undefined)=>{
    return {
        structure: structure,
        message: message,
        verbatim: verbatim,
        name
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
                return dataResponse(false, error);
            });
        console.log('axios collections:=> ', rep);
        return rep;
    } catch (err) {
        console.error('Error executing service axios collections process::=> ', err);
        let error = err.toString();
        return dataResponse(false, error);
    }
}

const show = async(name) =>{
    try {
        let rep = await Axios.get(`models/${name}`).then(
            response=>{
                let { data } = response.data;
                let { error } = response.data;
                let { message } = response.data;
                let { name, schema } = data
                let { verbatim, json} = schema;
                let msg = message || error;
                return modelResponse(json, msg, verbatim, name);

            }).catch(err =>{
                console.error('error in the response of the axios collection process service show:=> ', err);
                let error = err.toString();
                return modelResponse(false, error);
            });
        console.log('axios collection show:=> ', rep);
        return rep;
    } catch (err) {
        console.error('Error executing service axios collection show process:=> ', err);
        let error = err.toString();
        return modelResponse(false, error);
    }
}

const create = async(model) =>{
    try {
        let rep = await Axios.post(`models`, model).then(
            response=>{
                let { data } = response.data;
                let { error } = response.data;
                let { message } = response.data;
                let { verbatim, structure } = data
                let msg = message || error;
                return modelResponse(structure, msg, verbatim, model.name);

            }).catch(err =>{
                console.error('error in the response of the axios collection process service create:=> ', err);
                let error = err.toString();
                return modelResponse(false, error);
            });
        console.log('axios collection create:=> ', rep);
        return rep;
    } catch (err) {
        console.error('Error executing service axios collection create process:=> ', err);
        let error = err.toString();
        return modelResponse(false, error);
    }
}

const destroy = async(model) =>{
    console.log('destroy: ', model);
    try {
        let rep = await Axios.delete(`models`, {
            data: model
        }).then(
            response=>{
                let { data } = response.data;
                let { error } = response.data;
                let { message } = response.data;
                let msg = message || error;
                return dataResponse(data, msg);

            }).catch(err =>{
                console.error('error in the response of the axios collection process service destroy:=> ', err);
                let error = err.toString();
                return dataResponse(false, error);
            });
        console.log('axios collection destroy:=> ', rep);
        return rep;
    } catch (err) {
        console.error('Error executing service axios collection destroy process:=> ', err);
        let error = err.toString();
        return dataResponse(false, error);
    }
}

export default {
    index,
    show,
    create,
    destroy
}