import { Select } from "antd";
import React from "react";
import typeData from '../../resources/json/type_data';

const { Option } = Select;
function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}

const SelectDefault = (props)=>{
    let { defaultValue, placeholder, select} = props;
    return (
        <Select showSearch
        style={{ width: '100%' }}
        placeholder={ placeholder || "Select default"}
        optionFilterProp="children"
        onChange={select}
        //onFocus={select}
        onBlur={select}
        onSearch={onSearch}
        defaultValue={defaultValue || 'undefined'}
        filterOption={(input, option) => 
            option.props.children.toLowerCase()
            .indexOf(input.toLowerCase()) >= 0}>
        {
            typeData.map((type, index)=>{
                return <Option value={type} key={index}>{type}</Option>
            })
        }
        </Select>
    )
}
export default SelectDefault