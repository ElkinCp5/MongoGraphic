import axios from "axios";
import Configs from "../../config";
const URL_BASE = Configs.moongodb.manager+Configs.moongodb.serve+Configs.moongodb.port+'/api/';
export default axios.create({
  baseURL: URL_BASE,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json"
  }
});
