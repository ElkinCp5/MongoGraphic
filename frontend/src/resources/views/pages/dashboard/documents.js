import React, { Component } from "react";
import { Card, Row, Col, Icon, Tooltip, Empty, Button, Input, message as boxMessage, List, Collapse } from "antd";
import inflec from "inflection";


/* Import Custom Components */
import SessionStorage from "../../../../services/storage/session";
import LocalStorage from '../../../../services/storage/local';
import services from '../../../../services' ;
import { HtitleHeader as Title } from "../../../../components/header";

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

const { documentAxios } = services;
const { Panel }         = Collapse;

class DashboardPage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      collapsed: false,
      loanding: false,
      message: false,
      success: false,
      error: false,
      alert: false,
      name: this.props.match.params.name || false,
      buttonTitle: [
        {
          icon: 'plus',
          url: '/dashboard/collections/create',
          tooltip: `crear nuevo ${this.props.match.params.name}`
        }
        
      ]
    };
    this.dataComparison = this.dataComparison.bind(this);
    this.handleStateDefault = this.handleStateDefault.bind(this);
    this.handleUpdateCollection = this.handleUpdateCollection.bind(this);
  }

  componentDidMount(){
    this.handleDocuments();
  }

  componentWillUnmount() {
    //console.log('Fin en: ', this.state.collections.length);
  }

  dataComparison(collection_response = [], collection_state = []){
    let CR = JSON.stringify(collection_response); 
    let CS = JSON.stringify(collection_state);
    let isComparison = (CR === CS);
    return isComparison;
  }

  handleDocuments = async()=>{
    const { name } = await this.props.match.params;
    const response = await documentAxios.index(name);
    const { documents, message } = response;
    const comparison = !this.dataComparison(documents, this.state.documents);
    this.setState({ loanding: true});

    if(comparison){
      boxMessage.loading('updating collection list, please wait a moment', 1.5);
    }

    setTimeout(()=>{
      this.handlestatePreparer(documents, message, comparison);
    }, 2000);
    
  };

  handlestatePreparer(res, msg, comp){
    if(res.length){ 
      if(comp){ boxMessage.success(msg)}
      this.handleUpdateCollection(res);
    }else if(res.length && res.length <= 0){ 
      boxMessage.success('Empty document list');
      this.handleUpdateCollection(res);
    }else{
      boxMessage.error(msg)
      this.handleUpdateCollection([]);
      //LocalStorage.remove('documents');
    }
    
    setTimeout(()=>{ 
      this.handleStateDefault();
    }, 1000);
  }

  handleUpdateCollection(documents){
    this.setState({documents});
    //LocalStorage.set('documents', documents);
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
       if(i != '__v'){
        result.push({
          name: i,
          text: data[i]
        });
       }
     }
    return result;
  }

  render() {
    let { documents, loanding, buttonTitle } = this.state;
    let { routes, match, history } = this.props;
    let { params } = match;
    
    //console.log(this.documents);
  
    return (
      <div className="content-sub-page">
        <Title toBack={false} 
          title={`Doduments.${params.name }`}
          headsubTitle ={`${documents.length} ${documents.length >1 ? 'documents' : 'document'} of`}
          subTitle={`${params.name }`}
          buttons={buttonTitle}
          history={history}
        />
        <div className="container-page">
        <div className={loanding ? 'subloanding' : ''} />
        <Collapse
          defaultActiveKey={['1']}
          onChange={callback}
          expandIconPosition={'right'}
        >
          {
            documents.length ? (
              documents.map((document, index) => {
                return <Panel 
                header={<a href="">
                  <span style={{
                  color: 'var(--color-second-2)',
                  fontWeight: "bold"}}>ObjecId:
                  </span> {document._id}
                  </a>} 
                key={document._id} 
                extra={genExtra()}>
                  <div className={"content-props"}>
                    {
                      (this.handleSubtractProperties(document)) ? (
                        <List
                        itemLayout="horizontal"
                        dataSource={this.handleSubtractProperties(document)}
                        renderItem={item => (
                            <List.Item>
                              <List.Item.Meta
                                avatar={<Icon type="unordered-list" />}
                                title={<a href=""><span style={{
                                  color: 'var(--color-second-3)',
                                  fontWeight: "bold"
                                }}>{item.name}: </span> {item.text}</a>}
                              />
                            </List.Item>
                          )}
                        />
                      ): null
                    }

                  </div>
                </Panel>
              })
            ): (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                imageStyle={{
                  height: 60,
                }}
                description={
                  <span>
                    Customize <a href="#API">Description</a>
                  </span>
                }
              >
                <Button type="primary">Create Now</Button>
              </Empty>
            )
          }
          
        </Collapse>
        </div>
      </div>
    );
  }
}


export default DashboardPage;

/*
<Collapse
          defaultActiveKey={['1']}
          onChange={callback}
          expandIconPosition={'right'}
        >
          {
            documents.length ? (
              documents.map((document, index) => {
                return <Panel 
                header={<a href="">
                  <span style={{
                  color: 'var(--color-second-2)',
                  fontWeight: "bold"}}>ObjecId:
                  </span> {document._id}
                  </a>} 
                key={document._id} 
                extra={genExtra()}>
                  <div className={"content-props"}>
                    {
                      (this.handleSubtractProperties(document)) ? (
                        <List
                        itemLayout="horizontal"
                        dataSource={this.handleSubtractProperties(document)}
                        renderItem={item => (
                            <List.Item>
                              <List.Item.Meta
                                avatar={<Icon type="unordered-list" />}
                                title={<a href=""><span style={{
                                  color: 'var(--color-second-3)',
                                  fontWeight: "bold"
                                }}>item: </span> {item}</a>}
                              />
                            </List.Item>
                          )}
                        />
                      ): null
                    }

                  </div>
                </Panel>
              })
            ): null
          }
          
        </Collapse>

*/