//Load app dependencies  
const Graphic   = require("../dependencies");
const Routes    = require('../routes');
const Express   = require('express') ;
const Config    = require('../config')
//import {Express as App} from "../graphic-dependencies";

//Connect to the MongoDB test database  
//Mongoose.connect('mongodb://localhost/test_database');  
var App = Express();

Parameters = {
    model:{
        url: '',
        name: {
            singular: 'person',
            plural: 'people'
        }
    }
}

Routes(App, Parameters);
console.log(__dirname);

//Start the server  
App.listen(8080, ()=>{
    console.log('Serve: http://localhost:8080/', Config);
});  