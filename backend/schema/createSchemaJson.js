module.exports = (jsonSchema, nameSchema, root = '/../src/schemas/' ) => {
    const fs = require('fs');
    var pach = __dirname + root;

    if(jsonSchema != undefined || jsonSchema != 'undefined'){
        var jsonSchema = JSON.stringify(jsonSchema, null, 4)

        if(JSON.parse(jsonSchema)){

            fs.writeFile(`${pach + nameSchema}.json`, jsonSchema, 'utf8', (err) => {
                if (err) throw err;
                    console.warn(`The file ${nameSchema}.json has been saved!`);
            });

        }

    }
    
} 