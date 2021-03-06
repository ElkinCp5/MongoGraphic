'use strict'

const Graphic           = require("../../dependencies");
const structSchemaJson  = require('../../schema/createStructSchemaJson');
const saveFilSchemaJs   = require('../../schema/createSchemaJs');
const LoadingSchemas    = require('../../schema/loadinSchemaJson');
const specialFunctions  = require('../../other/specialFunctions');  
const MsgRespond        = require('../../other/msgRespond');
const path              = require('../../root');
const middlewares       = require('../../middlewares');
const router            = require('express-promise-router');

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
        res.status(200).json(MsgRespond(schemas, 'list', 'collection','collection', 
            'load of schemas completada'));
    };

    //find model by name  
    let show = async (req, res) => { 
        const { name } = req.params;
        const model = await _ValidateModelDinamic(name);
        model ? res.status(200).json(MsgRespond(model, 'show', name, 'model',
                    `finished search of the ${ name } scheme` )) :
                res.status(304).json(MsgRespond(false, 'show',  name, 'model', false,
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
                    res.status(200).json(MsgRespond(_Sch, 'create', _Sch.verbatim.singularize,'model',`creation of the completed ${name} schema`))
                : res.status(200).json(MsgRespond(false,'create', _Sch.verbatim.singularize,'model', Boolean, 'failed attempt to create a scheme!!'));
            }else if(model){
                res.status(304).json(MsgRespond(false, 'create', name,'model', Boolean, 'This scheme already exists!!'));
            }else{
                res.status(304).json(MsgRespond(false, 'create', name, 'model', Boolean, 'Invalid schema structure, check the fields: name and structure are required!!'));
            }
        }else{
            res.status(304).json(MsgRespond(false, 'create', name, 'model', Boolean, 'Invalid schema structure, check the fields: name and structure are required!!'));
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
                    res.status(200).json(MsgRespond(schema, 'update', _name + ' update ->' + _rename, 'model', `upgrade of the completed ${name} schema`)) :
                    res.status(304).json(MsgRespond(false, 'update', name, 'model', Boolean, `failed update, this model <'${_name}'> does exist` ))
            }else if(!model){
                res.status(304).json(MsgRespond(false, 'update', name, 'model', Boolean, 'This scheme does not exist!!'));
            }else{
                res.status(304).json(MsgRespond(false, 'update', name, 'model', Boolean, 'Invalid schema structure, check the fields: name and structure are required!!'));
            }
        }else{
            res.status(304).json(MsgRespond(false, 'update', name, 'model', Boolean, 'Invalid schema structure, check the fields: name and structure are required!!'));
        }
         
    };

    //distroy a model by name  
    let distroy = async(req, res) => {  
        // send for post renameFile add -> req.body.name

        let { confirm, name} = req.body
        console.log('Delete: ', { confirm, name});
        let _Sch = await _strSchema.toSchema(false_schema);
        let _saveFilSchema = await new saveFilSchemaJs(_Sch);

        if(_VlaidateUndefai(name) && _VlaidateUndefai(confirm) && _path.exists(name) && confirm && _saveFilSchema) {
            let module_delete = await _saveFilSchema.deleteFile(name);
            module_delete ? res.status(200).json(MsgRespond(true, 'delete', name, 'model', `removal of the completed ${ name } scheme` )): 
            res.status(304).json(MsgRespond(false, 'delete', name, 'model', Boolean, `failed delete, this model <'${name}'> does exist`));
        }else if(!_path.exists(name)){
            res.status(304).json(MsgRespond(false, 'delete', name,'model', Boolean, 'This scheme does not exist!!'));
        }else if(!confirm){
            res.status(304).json(MsgRespond(false, 'delete', name, 'model', Boolean, 'Invalid structure, check the field: confirm are required!!'));
        } else res.status(304).json(MsgRespond(false, 'delete', name, 'model', Boolean, 'Invalid structure, check the fields: name and confirm are required!!'));
    };

    // Route the manager models
    _router.get('/',         middlewares.accountAuth, index);
    _router.get('/:name',    middlewares.accountAuth, show);
    _router.post('/',        middlewares.accountAuth, create);
    _router.put('/',         middlewares.accountAuth, update);
    _router.delete('/',      middlewares.accountAuth, distroy);

module.exports = _router;