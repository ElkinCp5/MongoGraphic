import React, { Component } from "react";
import { Card, Row, Col, Icon, Tooltip, Button, Input, message as boxMessage, List, Collapse } from "antd";
import inflec from "inflection";


/* Import Custom Components */
import SessionStorage from "../../../../../../services/storage/session";
import LocalStorage from '../../../../../../services/storage/local';
import services from '../../../../../../services' ;
import { HtitleHeader as Title } from "../../../../../../components/header";

let buttonTitle = [
  {
    icon: 'delete',
    url: '/create'
  },
  {
    icon: 'edit',
    url: '/create',
    tooltip: ''
  },
  {
    icon: 'unordered-list',
    url: '/create'
  }
  
];

function callback(key) {
  console.log(key);
}

const genExtra = () => (
  <Icon
    type="setting"
    onClick={event => {
      // If you don't want click extra trigger collapse, you can prevent this:
      event.stopPropagation();
    }}
  />
);

const { modelAxios } = services;
const { Panel }      = Collapse;

class DashboardPage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      collection: LocalStorage.get('collection') || [],
      collapsed: false,
      loanding: false,
      message: false,
      success: false,
      error: false,
      alert: false,
      name: this.props.match.params.name || false
    };
    this.dataComparison = this.dataComparison.bind(this);
    this.handleStateDefault = this.handleStateDefault.bind(this);
    this.handleUpdateCollection = this.handleUpdateCollection.bind(this);
  }

  componentDidMount(){
    this.handlecollection();
  }

  componentWillUnmount() {
    //console.log('Fin en: ', this.state.collection.length);
  }

  dataComparison(collection_response = [], collection_state = []){
    let CR = JSON.stringify(collection_response); 
    let CS = JSON.stringify(collection_state);
    let isComparison = (CR === CS);
    return isComparison;
  }

  handlecollection = async()=>{
    const { name } = await this.props.match.params;
    const response = await modelAxios.show(name);
    const { model, verbatim, structure, message } = response;
    const comparison = !this.dataComparison(structure, this.state.collection);
    this.setState({ loanding: true});
    console.log('Type: ' ,(typeof response))
    if(comparison){
      boxMessage.loading('updating collection list, please wait a moment', 1.5);
    }

    setTimeout(()=>{
      this.handlestatePreparer(model, verbatim, structure, message, comparison);
    }, 2000);
    
  };

  handlestatePreparer(model, verbatim, structure, message, comparison){
    if((typeof verbatim) == 'object' && (typeof structure) == 'object' ){ 
      if(comparison){ boxMessage.success(message)}
      this.handleUpdateCollection(structure);
    }else{
      boxMessage.error(message)
      this.handleUpdateCollection([]);
      LocalStorage.remove('collection');
    }
    
    setTimeout(()=>{ 
      this.handleStateDefault();
    }, 1000);
  }

  handleUpdateCollection(collection){
    this.setState({collection});
    LocalStorage.set('collection', collection);
  }

  handleStateDefault(){
    this.setState({
      loanding: false,
      success: false,
      message: false,
      error: false
    });
  }

  handleSubtractProperties(data){
    let result = [];
     for(var i in data){
       let name = [i];
       let type = data[i].type;

       let field = {name, type}
      result.push(field)
     }
    return result;
  }

  render() {
    let { collection, loanding } = this.state;
    let { routes, match } = this.props;
    let { params } = match;
    
    console.log(this.handleSubtractProperties(collection));
  
    return (
      <div className="content-sub-page">
        <Title toBack={false} 
          title={`Collection: ${params.name }`}
          headsubTitle ={`10 Documents `}
          subTitle="list of documents"
          buttons={buttonTitle}
        />
        <div className="container-page">
        <div className={loanding ? 'subloanding' : ''} />
        <Collapse
          defaultActiveKey={false}
          onChange={callback}
          expandIconPosition={'right'}
        >
          {
            (this.handleSubtractProperties(collection)) ? (
              this.handleSubtractProperties(collection).map((field, index) => {
                return <Panel 
                header={<a href="">
                  <span style={{ 
                    color: 'var(--color-second-2)',
                    fontWeight: "bold"
                    }}>field:
                  </span> {field.name} </a>} 
                key={index} 
                extra={genExtra()}>
                  <div className={"content-props"}>
                   <h2>hola todos</h2>
                   {field.type}
                  </div>
                </Panel>
              })
            ): null
          }
          
        </Collapse>
        </div>
      </div>
    );
  }
}


export default DashboardPage;

