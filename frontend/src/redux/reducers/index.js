import { combineReducers } from "redux";
import ExampleReducer from "./Example";

const rooReducer = combineReducers({
  data: ExampleReducer
});
export default rooReducer;
