'use strict'
//App routes  
    // clase que crea los esquemas y modelos dinamicamente
    import Graphic                      from "../../dependencies";
    import LoadingSchemas               from '../../schema/loadinSchemaJson';
    import classSchemaDynamicModal      from '../../src/schemaDynamic';
    import msgJson                      from '../../other/error';
    import router                       from 'express-promise-router';

    const Inflection        = Graphic.Inflection;
    const _LoadSchema       = new LoadingSchemas;
    const _router = router();

    let _ValidateModelDinamic = async(name)=>{
        let Name = Inflection.singularize(name);
        let Schema = await _LoadSchema.singleSchema(Name);
        let _Modal = await new classSchemaDynamicModal(Schema.schema).ModalDynamic();
        //console.log(Name, Schema.schema, _Modal);
        return _Modal;
    };

    //list the documents
    let index = async(req, res) =>{ 
        let { name } = req.params; 
        let _Modal = await _ValidateModelDinamic(name);
        let List = await _Modal.find();

        res.json(
            msgJson(
                'show list', 
                List, 
                name, 
                'document', 
                'search completed'
            )
        );
    };  
    
    //Create a new document
    let create = async(req, res) =>{
        let { name } = req.params;
        let _Modal = await _ValidateModelDinamic(name);
        let document = await new  _Modal(req.body);
        let createDocument = await document.save();

        res.json(
            msgJson(
                'create', 
                createDocument, 
                name, 
                'document', 
                'create completed',
            )
        );
    };

    //find document by id  
    let show = async(req, res) => {
        let { name, id } = req.params; 

        let _Modal      = await _ValidateModelDinamic(name);
        let showDocument    = await _Modal.findOne({_id: id})

        res.json(
            msgJson(
                'show', 
                showDocument, 
                name, 
                'document', 
                'search completed'
            )
        );
    }; 

    //update a document by id  
    let update = async(req, res) => { 
        let { name, id } = req.params;
        let body = req.body;

        let _Modal          = await _ValidateModelDinamic(name);
        let updateDocument  = await _Modal.findByIdAndUpdate(id, body);

        res.json( 
            msgJson(
                'update', 
                updateDocument, 
                name, 
                'document', 
                'update completed'
            )
        )
    }; 

    //distroy a document by id  
    let distroy = async(req, res) => { 
        let { name, id } = req.params;

        let _Modal          = await _ValidateModelDinamic(name);
        let distroyDocument = await _Modal.deleteOne({_id: id});

        res.json(
            msgJson(
                'delete', 
                distroyDocument, 
                name, 
                'document', 
                'distroy completed'
            )
        )
    };

    //Link routes and functions 
    _router.get('/:name',         index);  
    _router.get('/:name/:id',     show); 
    _router.post('/:name',        create);  
    _router.delete('/:name/:id',  distroy);
    _router.put('/:name/:id',     update); 

    
module.exports = _router;