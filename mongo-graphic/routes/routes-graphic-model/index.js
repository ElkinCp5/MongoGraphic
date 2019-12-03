//App routes  
module.exports = (Server) =>{  
    var msg = 'I am: ';
    const structSchemaJson  = require('../../schema/createStructSchemaJson');
    const saveFilSchemaJson = require('../../schema/createSchemaJson');
    const saveFilSchemaJs = require('../../schema/createSchemaJs');
    const LoadingSchemas    = require('../../schema/loadinSchemaJson');
    const path    = require('../../root');
    // Instanciar 
    var _strSchema = new structSchemaJson;
    const LoadSchema = new LoadingSchemas;
    var _path = new path('/src/schemas/');
    //console.log(_path.exists('coffee', '.json'))

    var json = { 
        name: 'user',
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
    var newJson = {
        name: 'Coffee',
        timestamps: true,
        structure: {
            "eggs": {
                "type": "Number",
                "min": [8, "'Too few eggs'"],
                "max": 16
            },
            "bacon": {
                "type": "Number",
                "required": [true, "'Why no bacon?'"]
            },
            "drink": {
                "type": "String",
                "enum": ["'Coffee'", "'Tea'"],
                "required": 'function() { return this.drink > 3;}'
            }
        }
    }
    //list the models
    index = (req, res) => {
        var ListsSchema = LoadSchema.listsSchema()
        res.json(ListsSchema);
    };

    //find model by name  
    show = (req, res) => {  
        var model = LoadSchema.singleSchema(req.params.name);
        model ? res.json(errorMsg(
            'show', 
            req.params.name, 
            model, 
            'model', 
            'search completed'
        ))
        : res.json(errorMsg(
            'show', 
            req.params.name, 
            Boolean, 
            'model',
            Boolean,
            `failed search, this model <'${req.params.name}'> does not exist`
        ))
    };

    //Create a new models
    create = (req, res) =>{  
        // send for post toSchema add -> req.body
        var Sch = _strSchema.toSchema(newJson);
        var _saveFilSchema = new saveFilSchemaJs(Sch);
        Sch ? _saveFilSchema.saveFile(Sch.verbatim.singularize) & res.json({Sch})
        : res.json({msg: 'frm or struct for schema Js: invalider'});
    };
    
    //update a model by name  
    update = (req, res) => {  
        // send for post renameFile add -> req.body.name
        var _Sch = _strSchema.toSchema(json);
        var _saveFilSchema = new saveFilSchemaJs(_Sch);
        var _name = _Sch.verbatim.singularize;
        var _rename = 'referee';
        var _updateOne = true;
        if(_Sch) {
            var model_update = _saveFilSchema.updateFile(_name, _rename, _updateOne); 
            model_update ? res.json(errorMsg(
                'update', 
                _name + ' update ->' + _rename, 
                model_update, 
                'model', 
                'update completed'
            ))
            : res.json(errorMsg(
                'update', 
                req.params.name, 
                Boolean, 
                'model',
                Boolean,
                `failed update, this model <'${_name}'> does exist`
            ))
        } else res.json({msg: 'frm or struct for schema Js: invalider'});

        console.log(msg + 'update model: ' + _name); 
    };

    //distroy a model by name  
    distroy = (req, res) => {  
        // send for post renameFile add -> req.body.name
        var _Sch = _strSchema.toSchema(newJson);
        var _saveFilSchema = new saveFilSchemaJs(_Sch);
        var _name = 'referee';
        if(_path.exists(_name)) {
            var module_delete = _saveFilSchema.deleteFile(_name); 
            module_delete ? res.json(errorMsg(
                'delete', 
                _name, 
                Boolean, 
                'model', 
                'delete completed'
            ))
            : res.json(errorMsg(
                'delete', 
                _name, 
                Boolean, 
                'model',
                Boolean,
                `failed delete, this model <'${_name}'> does exist`
            ))
        } else res.json({msg: 'frm or struct for schema Js: invalider'});
    };
    //Create a new models
    connect = (req, res) =>{  
        res.end(msg + 'view connect');
        console.log(msg + 'view connect'); 
    };  

    errorMsg = (name, action, request, area, message, error )=>{
        console.log(`${action}: ${name} // ${area}`);
        return {
            data:    request,
            action:     `${action}: ${name}`, 
            area:       area,
            message:    message,
            error:      error
        };
    }

    //Link routes and functions
    Server.get('/api/models/create', create);
    Server.get('/api/models/update/', update);
    Server.get('/api/models/delete/', distroy);

    Server.get('/api/', index);
    Server.get('/api/connect', connect);
    // Route the manager models
    Server.get('/api/models', index);
    Server.get('/api/models/:name', show);
    Server.post('/api/models', create);
    Server.put('/api/models/:name', update);
    Server.delete('/api/models/:name', distroy);
}