//App routes  
module.exports = (Server) =>{  
    var msg = 'I am: ';
    const structSchemaJson  = require('../../schema/createStructSchemaJson');
    const saveFilSchemaJson = require('../../schema/createSchemaJson');
    const saveFilSchemaJs = require('../../schema/createSchemaJs');
    const LoadingSchemas    = require('../../schema/loadinSchemaJson');
    // Instanciar 
    var _strSchema = new structSchemaJson;
    const LoadSchema = new LoadingSchemas;

    var json = { 
        name: 'User',
        timestamps: true,
        structure: {
            name: "String", 
            lastName: "String",
            age: "Number",
            salary: "String",
            phone: "String",
            address: "String",
            create_at: "Date",
            update_at: "Date"
        }
    };

    //list the models
    index = (req, res) => {
        var ListsSchema = LoadSchema.listsSchema()
        res.json(ListsSchema);
        console.log(ListsSchema + 'view index'); 
    };

    //find model by name  
    show = (req, res) => {  
        res.end(msg + 'show model');
        console.log(msg + 'show model: ' + ModelSingularize); 
    };

    //Create a new models
    create = (req, res) =>{  
        var Sch = _strSchema.toSchema(json);
        Sch ? saveFilSchemaJson(Sch, Sch.verbatim.singularize) & res.json({Sch})
        : res.json({msg: 'frm or struct for schema Json: invalider'});
        console.log(json + 'view index');  
    };

    //Create a new models
    createJS = (req, res) =>{  
        var Sch = _strSchema.toSchema(json);
        Sch ? saveFilSchemaJs(Sch, Sch.verbatim.singularize) & res.json({Sch})
        : res.json({msg: 'frm or struct for schema Js: invalider'});
        console.log(json + 'view index'); 
    };
    
    //update a model by name  
    update = (req, res) => {  
        res.end(msg + 'update model: ' + ModelSingularize);
        console.log(msg + 'update model: ' + ModelSingularize); 
    };

    //distroy a model by name  
    distroy = (req, res) => {  
        res.end(msg + 'distroy model: ' + ModelSingularize);
        console.log(msg + 'distroy model: ' + ModelSingularize); 
    };
    //Create a new models
    connect = (req, res) =>{  
        res.end(msg + 'view connect');
        console.log(msg + 'view connect'); 
    };  
  
    //Link routes and functions  
    Server.get('/api/models/create', createJS);


    Server.get('/api/', index);
    Server.get('/api/connect', connect);
    // Route the manager models
    Server.get('/api/models', index);
    Server.get('/api/models/:name', show);
    Server.post('/api/models', create);
    Server.put('/api/models/:name', update);
    Server.delete('/api/models/:name', distroy);
}