class validate{
    constructor(root = '/../src/schemas/'){
        this.Pach = __dirname + root;
        this.FileManager = require('fs');
    }
    existsSchema(file){
        var filePath = `${this.Pach + file}.js`;
        console.log(filePath)
        this.FileManager.stat(filePath, (err)=>{
            if (!err) {
                return {err: true};
            } else if (err.code === 'ENOENT') {
                return {err:false};
            }
        })
    }
}
module.exports = validate