import { Config } from "../utils";

const host = {port: '',  serve: ''};
const baseURL = host.serve+host.port+'/api/';


const headers = {
    'Content-type': 'application/json'
};
export default {
    baseURL,
    headers
};