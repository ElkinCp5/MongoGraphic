const handleData = (data) =>{
    let result = [];
     for(var i in data){
       let field = {};
       if(data[i].required){ field['required'] = data[i].required };
       if(data[i].unique){ field['unique'] = data[i].unique};
       if(data[i].type){ field['type'] = data[i].type};
       if(data[i].min){ field['min'] = data[i].min };
       if(data[i].max){ field['max'] = data[i].max};
       if(data[i].min){ field['min'] = data[i].min };
       field['name'] = i;
      result.push(field)
     }
    return result;
  }

export default handleData;