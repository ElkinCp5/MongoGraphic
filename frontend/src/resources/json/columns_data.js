import React from "react";
var width = 150;
const handleColumn = (data)=>{
    let result = [];
    let width = 200;
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
    for(const value in data){
      if(data[value].type){
        if(!columns['type']){ 
        result.push(
          {
            title: "Type",
            dataIndex: "type",
            key: "type",
            width: width,
          }
        )
        columns['type'] = 'type';
      }
      };
      if(data[value].required){
        if(!columns['required']){ 
        result.push(
          {
            title: "Required",
            dataIndex: "required",
            key: "required",
            width: width,
          }
        )
        columns['requires'] = 'requires';
        }
      };
      if(data[value].unique){
        if(!columns['unique']){ 
        result.push(
          {
            title: "Unique",
            dataIndex: "unique",
            key: "unique",
            width: width,
          }
        )
        columns['unique'] = 'unique';
        }
      };
      if(data[value].min){
        if(!columns['min']){ 
        result.push(
          {
            title: "Min",
            dataIndex: "min",
            key: "min",
            width: width,
          }
        )
        columns['min'] = 'min';
      }
      };
      if(data[value].max){
        if(!columns['max']){ 
        result.push(
          {
            title: "Max",
            dataIndex: "max",
            key: "max",
            width: width,
          }
        )
        columns['max'] = 'max';
      }
      };
      if(data[value].default){
        if(!columns['default']){ 
        result.push(
          {
            title: "Default",
            dataIndex: "default",
            key: "default",
          }
        )
        columns['default'] = 'default';
      }
      };
      
    }
    result.push({
      title: '',
      key: 'Parameters',
    })
    return result;
  }
  export default handleColumn;