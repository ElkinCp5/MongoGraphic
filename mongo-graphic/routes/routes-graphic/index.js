//App routes  
module.exports = function(Server){  
  
    var msg = 'I am: ';
    //list the documents
    index = function(req, res){  
        /*var person = new Person({name: req.body.name, lastName: req.body.lastName});  
        person.save();  
        res.end(); */
        
        res.end(msg + 'view index');
        console.log(msg + 'view index'); 
    };  
  
    //Create a new document
    connect = function(req, res){  
        /*Person.find(function(err, people) {  
            res.send(people);  
        }); */
        res.end(msg + 'view connect');
        console.log(msg + 'view connect'); 
    };  
  
    //Link routes and functions  
    Server.get('/', index);  
    Server.get('/connect', connect); 

}