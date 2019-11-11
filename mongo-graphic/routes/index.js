//App routes  
module.exports = function(Server, Parameters){  
  
    //Model = require(Parameters.model.url);
    var ModelNameSingular = Parameters.model.name.singular;
    var ModelNamePlural = Parameters.model.name.plural;
    var msg = 'I am: ';
    //list the documents
    index = (req, res) =>{  
        res.end(msg + 'list documents');
        console.log(msg + 'list documents'); 
    };  
  
    //Create a new document
    create = (req, res) =>{  
        res.end(msg + 'create document');
        console.log(msg + 'create document'); 
    };  
  
    //find document by id  
    show = (req, res) => {  
        res.end(msg + 'show document');
        console.log(msg + 'show document'); 
    }; 

    //update a document by id  
    update = (req, res) => {  
        res.end(msg + 'update document');
        console.log(msg + 'update document'); 
    }; 

    //distroy a document by id  
    distroy = (req, res) => {  
        res.end(msg + 'distroy document');
        console.log(msg + 'distroy document'); 
    };  
  
    //Link routes and functions  
    Server.get('/'+ModelNameSingular,              index);  
    Server.get('/'+ +ModelNameSingular +'/:id',    show); 

    Server.post('/'+ModelNameSingular,             create);  
    Server.delete('/'+ +ModelNameSingular +'/:id', distroy);
    Server.put('/'+ +ModelNameSingular +'/:id', update);
}