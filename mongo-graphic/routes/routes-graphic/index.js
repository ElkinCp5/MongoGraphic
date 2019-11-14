//App routes  
module.exports = (Server) =>{  
    var msg = 'I am: ';
    const greateSchema = require('../../createSchemaJson');
    // clase que crea los esquemas y modelos dinamicamente
    const classSchemaDynamicModal = require('../../src/schemaDynamic');
    // lista de objetos para los rutas permitidas
    const _ListsSchemaJson = require('../../schema/loadinSchemaJson');
    var _SchemaJson = require('../../src/schemas/person.json');
    const _ModalDinamic = new classSchemaDynamicModal(_SchemaJson).ModalDynamic();
    
    var json = { 
        verbatim: {
            low_first: "person",
            singularize: "person",
            pluralize: "people",
        },
        structure: {
            name: "String", 
            lastName:"String",
            age: "Number"
        }
    };
    json.structure["create_at"] = { type: "Date", default: Date.now };
    json.structure["update_at"] = { type: "Date", default: Date.now };
    //list the documents
    
    index = (req, res) => {  
        /*var person = new Person({name: req.body.name, lastName: req.body.lastName});  
        person.save();  
        res.end(); */
        //greateSchema(json, json.verbatim.low_first);
        _ModalDinamic.find().then((datas)=>{
            res.json(datas);
        });
        //res.json(_ListsSchemaJson);
        console.log(msg + 'view index'); 
    };  

    //Create a new document
    create = (req, res) =>{  
        var document = new _ModalDinamic({name: 'Elkin', lastName: 'Chaverra'});  
        document.save();  
        res.end(); 
        console.log(msg + 'view connect'); 
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
    Server.get('/create', create);
    Server.get('/connect', connect); 
}