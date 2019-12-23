//App routes  
const structSchemaJson  = require('../../schema/createStructSchemaJson');
const saveFilSchemaJson = require('../../schema/createSchemaJson');
const saveFilSchemaJs   = require('../../schema/createSchemaJs');
const LoadingSchemas    = require('../../schema/loadinSchemaJson');
const specialFunctions  = require('../../other/specialFunctions');  
const error             = require('../../other/error');
const path              = require('../../root');
const express           = require('express');

    // Estraer 
    const router = express.Router();

    var msg = 'I am: ';

    // Instanciar 
    var _strSchema  = new structSchemaJson;
    var _LoadSchema = new LoadingSchemas;
    var _specFuntion = new specialFunctions;
    var _path       = new path('/src/schemas/');
    //console.log(_path.exists('coffee', '.json'))
    var false_schema = { name: 'user', timestamps: true, structure: { name: "String" } };
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
    let index = async(req, res) => {
        let schemas = await _LoadSchema.listsSchema();
        res.json(schemas);
    };

    //find model by name  
    let show = async (req, res) => {  
        const { name } = req.params;
        const model = await _LoadSchema.singleSchema(name);
        res.json( error( 'show',  model,  name, 'model', 'search completed' ) );
    };

    //Create a new models
    let create = (req, res) =>{  
        // send for post toSchema add -> req.body
        const schema = req.body;
        if(_specFuntion.valSch_save(schema)){
            let _Sch = _strSchema.toSchema(schema);
            let _saveFilSchema = new saveFilSchemaJs(_Sch);

            _Sch ? _saveFilSchema.saveFile(_Sch.verbatim.singularize) & 
                res.json(error('create', _Sch, _Sch.verbatim.singularize,'model','create completed'))
            : res.json(error( 'create', _Sch,_Sch.verbatim.singularize,'model', Boolean, 'failed attempt to create a scheme!!'));
        }else{
            res.json({msg: 'frm or struct for schema Js: invalider'})
        }
    };
    
    //update a model by name  
    let update = (req, res) => {  
        // send for post renameFile add -> req.body.name
        var schema = req.body;
        if(_specFuntion.valSch_save(schema)){
            var _Sch = _strSchema.toSchema(schema);
            var _saveFilSchema = new saveFilSchemaJs(_Sch);
            var _name = _Sch.verbatim.singularize;
            var _rename = (schema.renemer != '' && schema.renemer != undefined && schema.renemer != 'undefined') ;
            var _updateOne = (_rename != '' && _rename != undefined && _rename != 'undefined') 
                                ? true : false ;
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
        }
         
    };

    //distroy a model by name  
    let distroy = (req, res) => {  
        // send for post renameFile add -> req.body.name
        var _Sch = _strSchema.toSchema(false_schema);
        var _saveFilSchema = new saveFilSchemaJs(_Sch);
        var _name = req.body.name;
        var _confirm = req.body.confirm;

        if(_path.exists(req.body.name) && _confirm) {
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

    // Route the manager models
    router.get('/',         index);
    router.get('/:name',    show);
    router.post('/',        create);
    router.put('/',         update);
    router.delete('/',      distroy);


module.exports = router;