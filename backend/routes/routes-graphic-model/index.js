'use strict'

import Graphic           from "../../dependencies";
import structSchemaJson  from '../../schema/createStructSchemaJson';
import saveFilSchemaJson from '../../schema/createSchemaJson';
import saveFilSchemaJs   from '../../schema/createSchemaJs';
import LoadingSchemas    from '../../schema/loadinSchemaJson';
import specialFunctions  from '../../other/specialFunctions';  
import MsgRespond        from '../../other/msgRespond';
import path              from '../../root';
import router            from 'express-promise-router';

    // Estraer 
    const Inflection        = Graphic.Inflection;
    const _router = router();
    // Instanciar
    var _strSchema  = new structSchemaJson;
    var _LoadSchema = new LoadingSchemas;
    var _specFuntion = new specialFunctions;
    var _path       = new path('/src/schemas/');
    //console.log(_path.exists('coffee', '.json'))
    var false_schema = { name: 'user', timestamps: true, structure: { name: "String" } };
    /*var json = { 
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
    }*/
    let _ValidateModelDinamic = async (name) =>{
        let Name = Inflection.singularize(name); 
        const model = await _LoadSchema.singleSchema(Name);
        return model ? model : false;
    }
     let _VlaidateUndefai =(arg)=>{
         return (arg !== undefined && arg !== 'undefined') ? true : false;
     }
    //list the models
    let index = async(req, res) => {
        let schemas = await _LoadSchema.listsSchema();
        res.json(schemas);
    };

    //find model by name  
    let show = async (req, res) => { 
        const { name } = req.params;
        const model = await _ValidateModelDinamic(name);
        model ? res.json(MsgRespond(model, 'show', name, 'model',
                    'search completed' )) :
                res.json(MsgRespond(false, 'show',  name, 'model', false,
                    'This scheme does not exist!' ));
    };

    //Create a new models
    let create = async (req, res) =>{
        const { name, structure } = req.body;
        const schema = req.body;
        // send for post toSchema add -> req.body
        if(_VlaidateUndefai(name) && _VlaidateUndefai(structure)){
            let model = await _ValidateModelDinamic(name);
            if(!model && _specFuntion.valSch_save(schema)){
                let _Sch = await _strSchema.toSchema(schema);
                let _saveFilSchema = await new saveFilSchemaJs(_Sch);

                _Sch ? await _saveFilSchema.saveFile(_Sch.verbatim.singularize) & 
                    res.json(MsgRespond(_Sch, 'create', _Sch.verbatim.singularize,'model','create completed'))
                : res.json(MsgRespond(_Sch,'create', _Sch.verbatim.singularize,'model', Boolean, 'failed attempt to create a scheme!!'));
            }else if(model){
                res.json(MsgRespond(model, 'create', name,'model', Boolean, 'This scheme already exists!!'));
            }else{
                res.json(MsgRespond(false, 'create', name, 'model', Boolean, 'Invalid schema structure, check the fields: name and timestamps are required!!'));
            }
        }else{
            res.json(MsgRespond(false, 'create', name, 'model', Boolean, 'Invalid schema structure, check the fields: name and timestamps are required!!'));
        }
    };
    
    //update a model by name  
    let update = async(req, res) => {  
        // send for post renameFile add -> req.body.name
        let {renemer, timestamps, structure, name} = req.body;
        let schema = req.body;
        
        if(_VlaidateUndefai(name) &&
             _VlaidateUndefai(structure) && 
             _VlaidateUndefai(timestamps) && 
             _VlaidateUndefai(renemer)){
                 
            let model = await _ValidateModelDinamic(name);
            let _valSche = await _specFuntion.valSch_save(schema)
            if(model && _valSche){
                var _Sch = await _strSchema.toSchema(schema);
                var _saveFilSchema = await new saveFilSchemaJs(_Sch);
                var _name = _Sch.verbatim.singularize;
                var _rename = (schema.renemer != '' && schema.renemer.length >= 2) ;
                var _updateOne = _VlaidateUndefai(renemer) ? true : false ;

                _Sch ? await _saveFilSchema.updateFile(_name, _rename, _updateOne) &
                    res.json(MsgRespond(schema, 'update', _name + ' update ->' + _rename, 'model', 'update completed')) :
                    res.json(MsgRespond(false, 'update', name, 'model', Boolean, `failed update, this model <'${_name}'> does exist` ))
            }else if(!model){
                res.json(MsgRespond(false, 'update', name, 'model', Boolean, 'This scheme does not exist!!'));
            }else{
                res.json(MsgRespond(false, 'update', name, 'model', Boolean, 'Invalid schema structure, check the fields: name and timestamps are required!!'));
            }
        }else{
            res.json(MsgRespond(false, 'update', name, 'model', Boolean, 'Invalid schema structure, check the fields: name and timestamps are required!!'));
        }
         
    };

    //distroy a model by name  
    let distroy = async(req, res) => {  
        // send for post renameFile add -> req.body.name

        let { confirm, name} = req.body
        let _Sch = _strSchema.toSchema(false_schema);
        let _saveFilSchema = await new saveFilSchemaJs(_Sch);

        if(_VlaidateUndefai(name) && _VlaidateUndefai(confirm) && _path.exists(name) && confirm && _saveFilSchema) {
            let module_delete = await _saveFilSchema.deleteFile(name);
            module_delete ? res.json(MsgRespond(false, 'delete', name, 'model', 'delete completed' )): 
            res.json(MsgRespond(false, 'delete', name, 'model', Boolean, `failed delete, this model <'${name}'> does exist`));
        }else if(!_path.exists(name)){
            res.json(MsgRespond(false, 'delete', name,'model', Boolean, 'This scheme does not exist!!'));
        }else if(!confirm){
            res.json(MsgRespond(false, 'delete', name, 'model', Boolean, 'Invalid structure, check the field: confirm are required!!'));
        } else res.json(MsgRespond(false, 'delete', name, 'model', Boolean, 'Invalid structure, check the fields: name and confirm are required!!'));
    };

    // Route the manager models
    _router.get('/',         index);
    _router.get('/:name',    show);
    _router.post('/',        create);
    _router.put('/',         update);
    _router.delete('/',      distroy);
    


module.exports = _router;