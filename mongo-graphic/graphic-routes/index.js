//App routes  
module.exports = function(Server, Parameters){  
  
    //Model = require(Parameters.model.url);
    ModelNameSingular = Parameters.model.name.singular;
    ModelNamePlural = Parameters.model.name.plural;
    var msg = 'I am: ';
    //list the documents
    index = function(req, res){  
        /*var person = new Person({name: req.body.name, lastName: req.body.lastName});  
        person.save();  
        res.end(); */
        
        res.end(msg + 'list documents');
        console.log(msg + 'list documents'); 
    };  
  
    //Create a new document
    create = function(req, res){  
        /*Person.find(function(err, people) {  
            res.send(people);  
        }); */
        res.end(msg + 'create document');
        console.log(msg + 'create document'); 
    };  
  
    //find document by id  
    show = (function(req, res) {  
        /*Person.findOne({_id: req.params.id}, function(error, person) {  
            res.send(person);  
        }) */
        res.end(msg + 'show document');
        console.log(msg + 'show document'); 
    }); 

    //update a document by id  
    update = (function(req, res) {  
        /*Person.findOne({_id: req.params.id}, function(error, person) {  
            res.send(person);  
        }) */
        res.end(msg + 'update document');
        console.log(msg + 'update document'); 
    }); 

    //distroy a document by id  
    distroy = (function(req, res) {  
        /*Person.findOne({_id: req.params.id}, function(error, person) {  
            res.send(person);  
        }) */
        res.end(msg + 'distroy document');
        console.log(msg + 'distroy document'); 
    });  
  
    //Link routes and functions  
    Server.get('/'+ModelNameSingular,              index);  
    Server.get('/'+ +ModelNameSingular +'/:id',    show); 

    Server.post('/'+ModelNameSingular,             create);  
    Server.delete('/'+ +ModelNameSingular +'/:id', distroy);
    Server.put('/'+ +ModelNameSingular +'/:id', update);
}