import { 
  Table, 
  Input, 
  InputNumber,
  Select,
  Switch,
  Button, 
  Popconfirm, 
  Form 
} from 'antd';
import React, {Component, createContext} from "react";

import typeData from '../../resources/json/type_data';


const { Option } = Select;
const { TextArea } = Input;
const data = [];
const EditableContext = createContext();

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

function inputLists(props){
  const { items } = props;
  console.log({
    items
  })

  const List = items.map((input, index) =>
  <li></li>
  );
  return List ;
}

class EditableCell extends Component {
  getInput = (value = 'string') => {
    let { inputType, dataIndex, record } = this.props;
    //console.log('value:', inputType);
    if (inputType === 'number') {
      let items = record[dataIndex]
      let typeView = (typeof items);
      //console.log(items)
      if( typeView == 'object'){
        return <Input />
      }
      return <InputNumber min={1} defaultValue={value}/>;

    }else if(inputType === 'switch'){
      let items = record[dataIndex]
      let typeView = (typeof items);
      console.log({typeView})
      if( typeView === 'object' || typeView === 'string'){
        return <TextArea
        value={value}
        //onChange={this.onChange}
        placeholder="Controlled autosize"
        autoSize={{ minRows: 3, maxRows: 5 }}
        />
      }else if(typeView === 'boolean' ){
        return <Switch
        checkedChildren={'true'}
        unCheckedChildren={'false'}
        />
      }
      return <Switch
      checkedChildren={'true'}
      unCheckedChildren={'false'}
      />

    }else if(inputType === 'select'){
      return <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Select a person"
      optionFilterProp="children"
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onSearch={onSearch}
      defaultValue={value || 'undefined'}
      filterOption={(input, option) =>
        option.props.children.toLowerCase()
        .indexOf(input.toLowerCase()) >= 0
      }
      >
      {
        typeData.map((type, index)=>{
          return <Option value={type} key={index}>{type}</Option>
        })
      }
      </Select>
    } else{
      return <Input />;
    }
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput(record))}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

class EditableTable extends Component {
  constructor(props) {
    super(props);
    this.rows = this.props.rows;
    this.columns = this.props.columns;
    this.state = { data, editingKey: '' };
    if(this.columns.length > 0){
      this.columns.push({
        title: 'Action',
        dataIndex: 'action',
        fixed: 'right',
        width: 150,
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <Button 
                  type="primary" 
                  shape="circle" 
                  icon="save" 
                  onClick={() => this.save(form, record.key)}
                  style={{ marginRight: 10 }}
                  />
                )}
              </EditableContext.Consumer>
              <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key )}>
                <Button
                type="danger"
                shape="circle" 
                icon="close-circle" 
                />
              </Popconfirm>
            </span>
          ) : (
            <Button type="primary" icon="edit" 
            disabled={editingKey !== ''} 
            onClick={() => this.edit(record.key, record )}>
              Edit
            </Button>
            
          );
        },
      });
    }
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };


  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.rows];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }

  edit(key, record = undefined) {
    console.log({
      record
    })
    this.setState({ editingKey: key });
  }

  typeInput(typeInput){
    if(typeInput == 'type'){
      return 'select'
    }else if(typeInput == 'required'){
      return 'switch'
    }else if(typeInput == 'min'){
      return 'number'
    }else if(typeInput == 'max'){
      return 'number'
    }else if(typeInput == 'enum'){
      return 'text'
    }else{
      return 'text'
    }
  };

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: this.typeInput(col.dataIndex),
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          dataSource={this.rows}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel,
          }}
          scroll={{ x: 1500}}
        />
      </EditableContext.Provider>
    );
  }
}


export default Form.create()(EditableTable);
