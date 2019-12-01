//App routes  
module.exports = function(Ser, Sch){ 
    
    const Schema = Sch.schema;
    const ModelSingularize = Schema.verbatim.singularize;
    const ModelPluralize = Schema.verbatim.pluralize; 
    // clase que crea los esquemas y modelos dinamicamente
    const _classSchemaDynamicModal = require('../../src/schemaDynamic');
    const _ModalDinamic = new _classSchemaDynamicModal(Schema).ModalDynamic();
    const _createModelJson = require('../../schema/createSchemaJson');

    //console.assert(Newset);
    var msg = 'I am: ';
    //list the documents
    index = (req, res) =>{  
        _ModalDinamic.find().then((datas)=>{
            res.locals[ModelPluralize] = datas;
            res.json(datas);
        });
    };  
    
    //Create a new document
    create = (req, res) =>{  
        var document = new  _ModalDinamic(req.body);  
        document.save((err)=> {
            if(err) res.json(errorMsg(
                'create', 
                ModelSingularize, 
                'null', 
                'document', 
                'failed create this document',
                err
            ));
            else res.json(errorMsg(
                'create', 
                ModelSingularize, 
                req.body, 
                'document', 
                'create completed',
                
            ));
        }) 
    };

  
    //find document by id  
    show = (req, res) => {  
        _ModalDinamic.findOne({_id: req.params.id}).then((document)=>{
            if(document) res.json(errorMsg(
                'show', 
                ModelSingularize, 
                document, 
                'document', 
                'search completed'
            ));
            else res.json(errorMsg(
                'show', 
                ModelSingularize, 
                req.params.id, 
                'document', 
                'failed search, this document does not exist'
            ));
        });
        console.log(msg + 'show document: ' + ModelSingularize); 
    }; 

    //update a document by id  
    update = (req, res) => {  
        res.end(msg + 'update document: ' + ModelSingularize);
        console.log(msg + 'update document: ' + ModelSingularize); 
    }; 

    //distroy a document by id  
    distroy = (req, res) => { 
        _ModalDinamic.deleteOne({_id: req.params.id}, (err)=> {
            if(err) res.json(errorMsg(
                'delete', 
                ModelSingularize, 
                req.params.id, 
                'document', 
                'failed delete, this document does not exist'
            ));
            else res.json(errorMsg(
                'delete', 
                ModelSingularize, 
                req.params.id, 
                'document', 
                'distroy completed',
                err
            ));

        });
        
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
    Ser.get(`/api/document/${ModelSingularize}`,         index);  
    Ser.get(`/api/document/${ModelSingularize}/:id`,     show); 
    
    Ser.get(`/api/document/model/create/document`,        create);
    Ser.post(`/api/document/${ModelSingularize}`,        create);  
    Ser.delete(`/api/document/${ModelSingularize}/:id`,  distroy);
    Ser.put(`/api/document/${ModelSingularize}/:id`,     update); 
}