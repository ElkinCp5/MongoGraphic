//App routes  
const error             = require('../../other/error');
const path              = require('../../root');
const express           = require('express');

    // Estraer 
    const _router = express.Router();
    const _path = new path('/public/');
    //list the models
    let index = async(req, res) => {
        let root_frontend = _path.exists('index', '.html');
        console.log('Hola soy el frontend: ', root_frontend, _path.file('index', '.html'));
        res.sendFile(root_frontend);
    };
    // Route the manager models
    _router.get('*', index);
    
module.exports = _router;