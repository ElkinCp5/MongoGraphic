//Load app dependencies  
const Graphic   = require("../graphic-dependencies");
const Routes    = require('../graphic-routes');
const Express   = require('express') ;
const Config    = require('../graphic-config')
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
    console.log('Serve on port ');
});  