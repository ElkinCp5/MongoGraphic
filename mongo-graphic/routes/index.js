//App routes  
module.exports = function(Server, Schema){  
  
    //Model = require(Parameters.model.url);
    console.log(Schema.verbatim);
    var ModelSingularize = Schema.verbatim.singularize;
    var ModelPluralize = Schema.verbatim.pluralize;
    var msg = 'I am: ';
    
    //list the documents
    index = (req, res) =>{  
        res.end(msg + 'list documents: ' + ModelSingularize);
        console.log(msg + 'list documents: ' + ModelSingularize); 
    };  
  
    //Create a new document
    create = (req, res) =>{  
        res.end(msg + 'create document: ' + ModelSingularize);
        console.log(msg + 'create document: ' + ModelSingularize); 
    };  
  
    //find document by id  
    show = (req, res) => {  
        res.end(msg + 'show document: ' + ModelSingularize);
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
    Server.get(`/manager/${ModelSingularize}`,         index);  
    Server.get(`/manager/${ModelSingularize}/:id`,     show); 

    Server.post(`/manager/${ModelSingularize}`,        create);  
    Server.delete(`/manager/${ModelSingularize}/:id`,  distroy);
    Server.put(`/manager/${ModelSingularize}/:id`,     update);
}