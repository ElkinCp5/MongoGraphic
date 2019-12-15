'use strict'
//App routes  
module.exports = (Ser, Sch)=>{ 
    
    const Schema            = Sch.schema;
    const ModelSingularize  = Schema.verbatim.singularize;
    const ModelPluralize    = Schema.verbatim.pluralize; 
    // clase que crea los esquemas y modelos dinamicamente
    const classSchemaDynamicModal   = require('../../src/schemaDynamic');
    const msgJson                   = require('../../other/error');

    const _ModalDinamic = new classSchemaDynamicModal(Schema).ModalDynamic();
 
    //list the documents
    index = async(req, res) =>{ 
        await _ModalDinamic.find().then(
            (datas)=>{
                res.locals[ModelPluralize] = datas;
                res.json(msgJson(
                    'show list', 
                    datas, 
                    ModelPluralize, 
                    'document', 
                    'search completed'
                )
            )
        }).catch(error => 
            res.json(
                msgJson(
                    'create', 
                    Boolean, 
                    ModelSingularize, 
                    'document', 
                    'failed create this document',
                    error
                )
            )
        );
    };  
    
    //Create a new document
    create = async(req, res) =>{  
        let document = new  _ModalDinamic(req.body);
        await document.save(
            (error) => error ? res.json(
                msgJson(
                    'create', 
                    Boolean, 
                    ModelSingularize, 
                    'document', 
                    'failed create this document',
                    error
                )
            ) : res.json(msgJson(
                        'create', 
                        document, 
                        ModelSingularize, 
                        'document', 
                        'create completed',
                    )
                )
        );
    };

  
    //find document by id  
    show = async(req, res) => {  
        await _ModalDinamic.findOne({_id: req.params.id})
            .then(document => res.json( msgJson(
                        'show', 
                        document, 
                        ModelSingularize, 
                        'document', 
                        'search completed'
                    )
                )
            ).catch(error => res.json( msgJson(
                        'show', 
                        req.params.id, 
                        ModelSingularize, 
                        'document', 
                        'failed search, this document does not exist',
                        error
                    )
                )
            );
    }; 

    //update a document by id  
    update = async(req, res) => { 
        const body = req.body;
        await _ModalDinamic.findByIdAndUpdate(req.params.id, body)
        .then(() => res.json( msgJson(
                    'update', 
                    body, 
                    ModelSingularize, 
                    'document', 
                    'update completed'
                )
            )
        ).catch(error => res.json( msgJson(
                    'update', 
                    req.params.id, 
                    ModelSingularize, 
                    'document', 
                    'failed update, this document does not exist',
                    error
                )
            )
        );
    }; 

    //distroy a document by id  
    distroy = async(req, res) => { 
        await _ModalDinamic.deleteOne({_id: req.params.id}).then(() => res.json(msgJson(
                    'delete', 
                    req.params.id, 
                    ModelSingularize, 
                    'document', 
                    'distroy completed'
                )
            )
        ).catch(error => res.json(msgJson(
                    'delete', 
                    req.params.id, 
                    ModelSingularize, 
                    'document', 
                    'failed delete, this document does not exist',
                    error
                )
            )
        );
        
    };

    //Link routes and functions 
    Ser.get(`/api/document/${ModelSingularize}`,         index);  
    Ser.get(`/api/document/${ModelSingularize}/:id`,     show); 
    Ser.post(`/api/document/${ModelSingularize}`,        create);  
    Ser.delete(`/api/document/${ModelSingularize}/:id`,  distroy);
    Ser.put(`/api/document/${ModelSingularize}/:id`,     update); 
}