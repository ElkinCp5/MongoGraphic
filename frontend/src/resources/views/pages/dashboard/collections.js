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
  Skeleton,
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
  const { collections, loanding } = props;
  const List = collections.map((fild, index) =>
    <Cards key={index}
    index={index}
    title={fild.name} 
    description={fild.schema.verbatim.pluralize}
    icon={'database'}
    url={`collections/${fild.name}`}
    loanding={loanding}
    action={{
      name: fild.schema.verbatim.singularize,
      confirm: true
    }}
    />
  );
  return List ;
}


//LocalStorage.remove('collections');
class DashboardPage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      loanding: true,
      message: false,
      success: false,
      error: false,
      alert: false,
      buttonTitle:[]
    };
    this.handleStateDefault = this.handleStateDefault.bind(this);
    this.handleUpdateCollection = this.handleUpdateCollection.bind(this);
    this.handleLoand = this.handleLoand.bind(this);
  }

  componentDidMount(){
    this.handleCollections();
    //LocalStorage.remove('collections'); 
    //console.log('Inicio: ', this.state.collections.length);

    /**
     * 
     * 
     * <Alert message="Warning text" banner />
     */
  }

  componentWillUnmount() {
    //console.log('Fin en: ', this.state.collections.length);
  }

  dataComparison(collection_response, collection_state){
    if(collection_response.length){collection_response.sort()}; 
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
      this.handlestatePreparer(collections, message, true);
    }, 2000);
    
  };

  handlestatePreparer(collections, message, comp){
    if(collections.length){ 
      if(comp){ boxMessage.success(message)}
      this.handleUpdateCollection(collections);
    }else if(collections.length <= 0){ 
      boxMessage.success('Empty collection list');
      this.handleUpdateCollection(collections);
    }else{
      boxMessage.error(message)
      this.handleUpdateCollection([]);
      //LocalStorage.remove('collections');
    }
    
    setTimeout(()=>{ 
      this.handleStateDefault();
    }, 1000);
  }

  handleUpdateCollection(collections){
    this.setState({collections});
    //LocalStorage.set('collections', documents);
  }

  handleStateDefault(){
    this.setState({
      loanding: false,
      success: false,
      message: false,
      error: false
    });
  }

  handleLoand(){
    this.setState({
      loanding: !this.state.loanding
    });
  }


  render() {
    let { routes, history } = this.props;
    let { collections, loanding, alert, buttonTitle } = this.state;
    //console.log('Fin: ', this.state.collections.length);

    return (
      <div className="content-sub-page">
        {
          //<div className={loanding ? 'subloanding' : ''} />
        }
        <Title toBack={false} 
          title={`Schema list`}
          headsubTitle ={`Quantity of schemas`}
          subTitle={`${collections.length}`}
          buttons={buttonTitle}
          history={history}
        />
        <div className="container-page">
          
          {
            <Skeleton loading={loanding} active>
              {
              !loanding ?
              [<Cards
              title='New schema'
              description='collection o schema moongose'
              icon={'plus'}
              url={`/dashboard/create/collection`}

              key={'0'}
              />,
              <CardLists 
              collections={collections}
              loanding={this.handleLoand}
              key={'lists-card'}/>] : null
              }
            </Skeleton>
          }
        </div>
      </div>
    );
  }
}


export default DashboardPage;