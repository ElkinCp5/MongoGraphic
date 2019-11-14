//App routes  
module.exports = function(Server, Schema){  
    var Sch = Schema.schema;
    var Verb = Sch.verbatim 
    // clase que crea los esquemas y modelos dinamicamente
    const classSchemaDynamicModal = require('../src/schemaDynamic');
    const _ModalDinamic = new classSchemaDynamicModal(Sch).ModalDynamic();
    //Model = require(Parameters.model.url);
    //console.log('Objet: ',  Sch);
    var ModelSingularize = Verb.singularize;
    var ModelPluralize = Verb.pluralize;


    var msg = 'I am: ';
    //list the documents
    index = (req, res) =>{  
        _ModalDinamic.find().then((datas)=>{
            res.locals[ModelPluralize] = datas;
            res.json(datas);
        });
        console.log(msg + 'list documents: ' + ModelSingularize);
    };  
  
    //Create a new document
    create = (req, res) =>{  
        var document = new _ModalDinamic({name: 'Marya', lastName: 'Apons'});  
        document.save();  
        res.json({
            model: `new ${ModelSingularize}`, 
            document: document
        }); 
        console.log(msg + 'create document: ' + ModelSingularize); 
    };  
  
    //find document by id  
    show = (req, res) => {  
        _ModalDinamic.findOne({_id: req.params.id}).then((document)=>{
            res.json(document);  
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
        res.end(msg + 'distroy document: ' + ModelSingularize);
        console.log(msg + 'distroy document: ' + ModelSingularize); 
    };  
  
    //Link routes and functions  
    Server.get(`/api/${ModelSingularize}`,         index);  
    Server.get(`/api/${ModelSingularize}/:id`,     show); 

    Server.get(`/api/${ModelSingularize}/create/model`,         create); 
    Server.post(`/api/${ModelSingularize}`,        create);  
    Server.delete(`/api/${ModelSingularize}/:id`,  distroy);
    Server.put(`/api/${ModelSingularize}/:id`,     update);
}