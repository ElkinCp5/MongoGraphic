import { Config } from "../utils";

const { host } = Config;
const baseURL = host.serve+host.port+'/api/';
console.log('baseURL: ', baseURL);

const headers = {
    'Accept': 'application/json',
    'Content-type': 'application/json'
};
export default {
    baseURL,
    headers
};