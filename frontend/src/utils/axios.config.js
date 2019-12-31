import Axios from "axios";
import Configs from "./config";

const ServerNode  = Configs.host.serve;
const Port        = Configs.host.port;
const URL_BASE    = ServerNode+Port+'/api/';
console.log('URL_BASE:=> ' + URL_BASE);
export default Axios.create(
  {
    baseURL: URL_BASE,
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }
  }
);
/*

'accept': 'application/json',
                'accept-language': 'en_US',
                'content-type': 'application/x-www-form-urlencoded'

*/

//{
//Accept: "application/json, text/plain, */*",
//"Content-Type": "application/json",
//'Access-Control-Allow-Origin': '*'
//}

