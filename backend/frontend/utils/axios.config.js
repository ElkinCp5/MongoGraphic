import axios from "axios";
import Configs from "../../config";

const ServerNode    = Configs.host.serve;
const Port        = Configs.host.port;
const URL_BASE = ServerNode+Port+'/api/';
console.log('URL_BASE:=> ' + URL_BASE);
export default axios.create({
  baseURL: URL_BASE,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json"
  }
});
