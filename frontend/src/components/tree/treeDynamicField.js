import React, { Component } from "react";
import { Tree, Switch, Input, InputNumber, Select, Checkbox } from 'antd';
import SelectDefault from "../select/selectTypeDafault";

const { TreeNode } = Tree;
const InputGroup = Input.Group;
const { Option } = Select;

class treeDynamicField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'String',
            params:{
                name: undefined,
                type: undefined,
                required: undefined,
                min: undefined,
                max: undefined,
                enum:undefined,
            },
            messageRequired: false,
            messageMax: false,
            messageMin: false,
            messageEnum: false,
        };
        this.onType     = this.onType.bind(this);  
        this.onMessage  = this.onMessage.bind(this);
        this.onRequired = this.onRequired.bind(this);  
        this.onMin      = this.onMin.bind(this);  
        this.handleChangeRequired = this.handleChangeRequired.bind(this);
        this.handleChangeMin = this.handleChangeMin.bind(this);
        this.onInitialize = this.onInitialize.bind(this)
    }

    onInitialize(){
        this.setState({
            params:{
                type: undefined,
                required: undefined,
                min: undefined,
                max: undefined,
                enum:undefined,
            }
        })

    }
    componentDidUpdate(){
        const { onProcessField, initialize } = this.props
        const { name, params } = this.state
        onProcessField({ name, params });
    }

    handleChange(e) {
        e.persist();
        if(e.target.value && e.target.value != ''){
            this.setState(state=>(
                {
                    ...state,
                    name: e.target.value ,
                    params:{
                        ...state.params,
                        name: e.target.value 
                      }
                  }
            ));
        }else{
            this.setState({
                name: undefined
            });
        }
    };

    onType = (select) => {
        this.setState(state=>(
            {
                ...state,
                params:{
                    ...state.params,
                    type: (select) ? select : undefined
                  }
              }
        ));
    };


    onMessage = (property = undefined) => {
        this.setState(property);
    };

    onRequired = (e) => {
        this.setState(state=>(
            {
                ...state,
                params:{
                    ...state.params,
                    required: (!e.target.checked) ? undefined : true
                  }
              }
        ));
    };

    onMin = (e) => {
        this.setState(state=>(
            {
                ...state,
                params:{
                    ...state.params,
                    min: (!e.target.checked) ? undefined : 1
                  }
            }
        ));
    };

    onMax = (e) => {
        this.setState(state=>(
            {
                ...state,
                params:{
                    ...state.params,
                    max: (!e.target.checked) ? undefined : 1
                  }
            }
        ));
    };

    handleChangeRequired = (e) => {
        e.persist();
        const { value } = e.target;
        const { params, messageRequired } = this.state;
        let { required } = params;
        if(messageRequired){
            if((typeof required) == 'boolean' && value){
                this.setState(state => ({ 
                    ...state,
                    params:{
                        ...state.params,
                        required: [
                            required,
                            value
                        ]
                    }
                }));
            }else if((typeof required) == 'object' && value != ''){
                this.setState(state => ({ 
                    ...state,
                    params:{
                        ...state.params,
                        required: [
                            required[0],
                            value
                        ]
                    }
                }));
            }else{
                this.setState(state =>({ 
                    ...state,
                    params:{ 
                        ...state.params,
                        required: true
                    }
                }));
            }
        }
        //console.log(this.state)
    };

    handleChangeMin = (value) => {
        const { params } = this.state;
        let { min } = params;
        if((typeof min) == 'number' && (typeof value) != 'object'){
            this.setState(state => ({ 
                ...state,
                params:{ 
                    ...state.params,
                    min: value
                }
            }));
        }else if((typeof min) == 'object' && (typeof value) != 'object'){
            this.setState(state => ({ 
                ...state,
                params:{
                    ...state.params,
                    min: [
                        value,
                        state.params.min[1]
                    ]
                }
            }));
        }

    };

    handleMessageMin =(e) =>{
        const { params, messageMin } = this.state;
        const { min } = params;
        const text = e.target.value;

        if(messageMin && (typeof min) == 'number' && text != ''){
            this.setState(state => ({ 
                ...state,
                params:{
                    ...state.params,
                    min: [
                        state.params.min,
                        text
                    ]
                }
            }));
        }else if(messageMin && (typeof min) == 'object' && text != ''){
            this.setState(state => ({ 
                ...state,
                params:{
                    ...state.params,
                    min: [
                        state.params.min[0],
                        text
                    ]
                }
            }));
        }else if((typeof min) == 'number'){
            this.setState(state => ({ 
                ...state,
                params:{
                    ...state.params,
                    min: min
                }
            }));
        }
    }

    handleMessageMax =(e) =>{
        const { params, messageMax } = this.state;
        const { max } = params;
        const text = e.target.value;

        if(messageMax && (typeof max) == 'number' && text != ''){
            this.setState(state => ({ 
                ...state,
                params:{
                    ...state.params,
                    max: [
                        state.params.max,
                        text
                    ]
                }
            }));
        }else if(messageMax && (typeof max) == 'object' && text != ''){
            this.setState(state => ({ 
                ...state,
                params:{
                    ...state.params,
                    max: [
                        state.params.max[0],
                        text
                    ]
                }
            }));
        }else if((typeof max) == 'number'){
            this.setState(state => ({ 
                ...state,
                params:{
                    ...state.params,
                    max: max
                }
            }));
        }
    }
    
    handleChangeMax = (value) => {
        const { params } = this.state;
        let { max } = params;
        if((typeof max) == 'number' && (typeof value) != 'object'){
            this.setState(state => ({ 
                ...state,
                params:{ 
                    ...state.params,
                    max: value
                }
            }));
        }else if((typeof max) == 'object' && (typeof value) != 'object'){
            this.setState(state => ({ 
                ...state,
                params:{
                    ...state.params,
                    max: [
                        value,
                        state.params.max[1]
                    ]
                }
            }));
        }

    };

    render() {
        const { onProcessField } = this.props
        const { params, messageRequired, messageMin, messageMax } = this.state;
        let { required, min, max } = params;
        
        return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Input onChange={ (e)=> this.handleChange(e) } 
                addonBefore="Field name is: "
                placeholder={'Name'}
                />
            </div>
            <SelectDefault defaultValue='Undefined' placeholder={'Select a type data'} select={this.onType}/>
            <ul className='list-validation'>
                <li className={`sub-validation ${required ? 'header' : '' }`} >
                    <Checkbox  name='required' onChange={this.onRequired}>
                        Required
                    </Checkbox>
                    <ul className={!required ? 'active' : '' }>
                        <li>
                        <Checkbox name='message' disabled={!required} 
                        onChange={
                            ()=>this.onMessage({ messageRequired: !messageRequired })
                            }>

                            Message
                        </Checkbox>
                        </li>
                        <li>
                            <Input style={{width: '90%'}}
                            placeholder={'Add validation message'}
                            disabled={!messageRequired }
                            autoFocus={true}
                            onFocus={this.handleChangeRequired}
                            onChange={this.handleChangeRequired} 
                            />
                        </li>
                    </ul>
                </li>
                <li className={`sub-validation ${min ? 'header' : '' }`} >
                    <Checkbox  name='minimum' onChange={this.onMin}>
                        Minimum
                    </Checkbox>
                    <ul className={!min ? 'active' : '' }>
                        <li>
                            <InputNumber disabled={!min}
                            style={{width: '90%' }}
                            defaultValue={1}
                            onFocus={this.handleChangeMin}
                            onChange={this.handleChangeMin}  
                            min={1} />
                        </li>
                        <li>
                        <Checkbox name='message' disabled={!min} 
                        onChange={
                            ()=> this.onMessage({ messageMin: !messageMin })
                            }>

                            Message
                        </Checkbox>
                        </li>
                        
                        <li>
                            <Input style={{width: '90%'}}
                            placeholder={'Add validation message'}
                            disabled={!messageMin }
                            autoFocus={true}
                            onFocus={(e)=>this.handleMessageMin(e)}
                            onChange={(e)=>this.handleMessageMin(e)} 
                            />
                        </li>
                    </ul>
                </li>
                <li className={`sub-validation ${max ? 'header' : '' }`} >
                    <Checkbox  name='maximum' onChange={this.onMax}>
                        Maximum
                    </Checkbox>
                    <ul className={!max ? 'active' : '' }>
                        <li>
                            <InputNumber disabled={!max}
                            style={{width: '90%' }}
                            defaultValue={1}
                            onFocus={this.handleChangeMax}
                            onChange={this.handleChangeMax}  
                            min={1} />
                        </li>
                        <li>
                        <Checkbox name='message' disabled={!max} 
                        onChange={
                            ()=> this.onMessage({ messageMax: !messageMax })
                            }>
                            Message
                        </Checkbox>
                        </li>
                        
                        <li>
                            <Input style={{width: '90%'}}
                            placeholder={'Add validation message'}
                            disabled={ !messageMax }
                            autoFocus={true}
                            onFocus={(e)=>this.handleMessageMax(e)}
                            onChange={(e)=>this.handleMessageMax(e)} 
                            />
                        </li>
                    </ul>
                </li>
            </ul>
            
          <pre>
              {
                  JSON.stringify(this.state, null, 4)
              }
          </pre>
        </div>
        );
    }
}

export default treeDynamicField;