//App routes  
module.exports = (Server) =>{  
    var msg = 'I am: ';
    const structSchemaJson = require('../../schema/createStructSchemaJson');
    const saveFilSchemaJson = require('../../schema/createSchemaJson');
    var _strSchema = new structSchemaJson;
    var json = { 
        name: 'Leader',
        timestamps: 'true',
        structure: {
            name: "String", 
            lastName:"String",
            age: "Number",
            salary: "String",
            phone: "String",
            address: "String",
            create_at: "Date",
            update_at: "Date"
        }
    };

    //list the documents
    
    index = (req, res) => { 
        var Sch = _strSchema.toSchema(json);
        Sch ? saveFilSchemaJson(Sch, Sch.verbatim.singularize) & res.json({Sch})
        : res.json({msg: 'frm or struct for schema Json: invalider'});
        console.log(json + 'view index'); 
    };  

    //Create a new document
    create = (req, res) =>{  
        /*var document = new _ModalDinamic({name: 'Elkin', lastName: 'Chaverra'});  
        document.save();  
        res.end(); 
        console.log(msg + 'view connect'); */
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