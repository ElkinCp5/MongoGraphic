if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

if (!Array.isObject) {
  Array.isObject = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Object]';
  };
}

const isInto =(columns, property) =>{
  return (!columns[property]) ? true : false;
}

const handleData = (data) =>{
    let rows  = [];
    let key   = 0;
    for(const property in data){
      let column = {};
      let type = (typeof data[property]);
      let subProperty = data[property];
      column['key'] = key++;
      if(type === 'object'){
        for(const property in subProperty){
          let subType = (typeof subProperty[property]);
          let content = subProperty[property];
          if(isInto(column, property)){
            column[property] = content;
          }
          //column[property] = data[property].required
        }

      }else if((typeof data[property]) === 'string'){
        column['type'] = data[property]
        
      }
      column['name'] = property;
      rows.push(column)
      
    }
    //console.log({data: rows});
    return rows;
  }

export default handleData;