module.exports = (jsonSchema, nameSchema, root = '/../src/schemas/' ) => {
    const fs = require('fs');
    var pach = __dirname + root;

    if(jsonSchema != undefined || jsonSchema != 'undefined'){ 
        var str = {} = jsonSchema.structure
        var jsonSchema  = 'var schema=' + JSON.stringify(jsonSchema, null, 4) + '\n module.exports = schema;';
        if(jsonSchema){
            fs.writeFile(`${pach + nameSchema}.js`, jsonSchema.replace(/["]+/g, ''), 'utf8', (err) => {
                if (err) throw err;
                    console.error(`The file ${nameSchema}.js has been saved!`);
            });

        }

    }
    
} 