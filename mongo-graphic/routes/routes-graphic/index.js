//App routes  
module.exports = (Server) =>{  
    var msg = 'I am: ';
    var greateSchema = require('../../createSchemaJson');
    var json = {nombre:'elkin',apellido:'chaverra portocarrero'};
    //list the documents
    index = (req, res) => {  
        /*var person = new Person({name: req.body.name, lastName: req.body.lastName});  
        person.save();  
        res.end(); */
        res.end(msg + 'view index');
        console.log(msg + 'view index'); 
        greateSchema(json,'user');
    };  
  
    //Create a new document
    connect = (req, res) =>{  
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