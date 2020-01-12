import React, { Component } from "react";
import { 
  Card, 
  Row, 
  Col, 
  Icon, 
  Tooltip, 
  Button, 
  Input, 
  Alert,
  message as boxMessage } from "antd";


/* Import Custom Components */
import { layoutDashboard as Dashboard } from "../../layouts";
import { HtitleHeader as Title } from "../../../../components/header";
import { cardDash as Cards } from "../../../../components/cards";
import SessionStorage from "../../../../services/storage/session";
import LocalStorage from '../../../../services/storage/local';
import services from '../../../../services' ;


const account = (SessionStorage.getAccount() != null) ? JSON.parse(SessionStorage.getAccount()) : null;

const { authFetch, modelAxios } = services;

function CardLists(props){
  const { collections } = props;
  const List = collections.map((fild, index) =>
    <Cards key={index}
    title={fild.name} 
    description={fild.schema.verbatim.pluralize}
    icon={'bank'}
    url={`collections/${fild.name}`}
    />
  );
  return List ;
}
const buttonTitle = [
  {
    icon: 'plus',
    url: '/create'
  }
];

//LocalStorage.remove('collections');
class DashboardPage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      collections: LocalStorage.get('collections') || [],
      loanding: false,
      message: false,
      success: false,
      error: false,
      alert: false
    };
    this.handleStateDefault = this.handleStateDefault.bind(this);
    this.handleUpdateCollection = this.handleUpdateCollection.bind(this);
  }

  componentDidMount(){
    this.handleCollections();
    //LocalStorage.remove('collections'); 
    //console.log('Inicio: ', this.state.collections.length);
  }

  componentWillUnmount() {
    //console.log('Fin en: ', this.state.collections.length);
  }

  dataComparison(collection_response, collection_state){
    collection_response.sort(); 
    collection_state.sort();
    let isComparison = (JSON.stringify(collection_response) === JSON.stringify(collection_state));
    return isComparison;
  }

  handleCollections = async()=>{
    const response = await modelAxios.index();
    const { collections, message } = response;
    const comparison = !this.dataComparison(collections, this.state.collections);
    this.setState({ loanding: true});

    if(comparison){
      boxMessage.loading('updating collections list, please wait a moment', 1.5);
    }

    setTimeout(()=>{
      this.handlestatePreparer(collections, message, comparison);
    }, 2000);
    
  };

  handlestatePreparer(res, msg, comp){
    if(res.length){ 
      if(comp){ boxMessage.success(msg)}
      this.handleUpdateCollection(res);
    }else if(res.length <= 0){ 
      boxMessage.success('Empty collection list');
      this.handleUpdateCollection(res);
    }else{
      boxMessage.error(msg)
      this.handleUpdateCollection([]);
      LocalStorage.remove('collections');
    }
    
    setTimeout(()=>{ 
      this.handleStateDefault();
    }, 1000);
  }

  handleUpdateCollection(documents){
    this.setState({documents});
    LocalStorage.set('collections', documents);
  }

  handleStateDefault(){
    this.setState({
      loanding: false,
      success: false,
      message: false,
      error: false
    });
  }

  render() {
    let { routes } = this.props;
    let { collections, loanding, alert } = this.state;
    //console.log('Fin: ', this.state.collections.length);

    return (
      <div className="content-sub-page">
        <div className={loanding ? 'subloanding' : ''} />
        <Title toBack={false} 
          title={`List of collections`}
          headsubTitle ={`Quantity`}
          subTitle={`${collections.length}`}
          buttons={buttonTitle}
        />
        <div className="container-page">

          {
            alert ?
            <Alert
              message="Error"
              description={alert}
              type="error"
              showIcon
            /> :
            <CardLists 
              collections={collections}
            />
          }
        </div>
      </div>
    );
  }
}


export default DashboardPage;