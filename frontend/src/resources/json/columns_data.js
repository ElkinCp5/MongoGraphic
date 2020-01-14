import React from "react";
const width = 200;

const camelizeString =(string)=>{
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const isInto =(columns, property) =>{
  return (!columns[property]) ? true : false;
}

const subtract =(result, columns) =>{
  
}

const JsonColumn = (text, width) =>{
  return {
    title: camelizeString(text),
    dataIndex: text,
    key: text,
    width,
  }
}

const handleColumn = (data)=>{
    let result = [];
    let columns = {};

    result.push(
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        //fixed: 'left',
        width: 150,
      }
    )
    for(const property in data){
      let type = (typeof data[property]);
      let subProperty = data[property];

      if(type === 'object'){

        for(const property in subProperty){
          let subType = (typeof subProperty[property]);
          if(isInto(columns, property)){
            result.push(JsonColumn(property, width));
            columns[property] = property;
          }
        }

      }else if(type === 'string'){

        if(isInto(columns, property)){
          result.push(JsonColumn(property, width));
          columns[property] = property;
        }
        
      }
    }
    result.push({
      title: '',
      key: 'Parameters',
    })
    //console.log({columns: result});
    return result;
  }
  export default handleColumn;