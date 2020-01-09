import React, { Component } from "react";
import { 
  Card, 
  Row, 
  Col, 
  Icon, 
  Tooltip, 
  Button, 
  Input, 
  Checkbox,
  message } from "antd";


/* Import Custom Components */
import { layoutDashboard as Dashboard } from "../../layouts";
import { HtitleHeader as Title } from "../../../../components/header";
import { cardDash as Cards } from "../../../../components/cards";
import SessionStorage from "../../../../services/storage/session";
import services from '../../../../services' ;


let account = (SessionStorage.getAccount() != null) ? JSON.parse(SessionStorage.getAccount()) : null;

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

class DashboardPage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      loanding: false,
      message: false,
      success: true,
      error: false
    };
  }

  componentDidMount(){
    //console.log('Count: ', this.state.collections.length)
    if(this.state.collections.length == 0){
      this.setState({collections: [], loanding: true, success: false, error: false })
      message.loading('Processing, collection request..', 1.5);
      this.handleCollections(); 
    }
  }


  handleCollections = () => {
    modelAxios.index().then(res=>{
        if(res.collections){
            this.setState({ collections: res.collections });
            setTimeout(()=>{ this.int(res.message) }, 1000);
        }else if(!res.collections){
          setTimeout(()=>{ this.uot(res.message) }, 1000);
        }
      }).catch(err =>{
          console.error('form axios reset error: ', err);
      });

  };

  int(message){
    if(message){
      this.setState(
        {
          success: true,
          message: message
        });
      setTimeout(()=> {this.handleMessage()}, 1000);
    }; 
  }

  uot(message){
    this.setState({
      error: true,
      message: message
    });
    setTimeout(()=> {this.handleMessage()}, 1000);
  }

  handleMessage(){
    let success     = this.state.success,
        error       = this.state.error, 
        messageInfo = this.state.message, 
        loanding    = this.state.loanding;

    if(error && loanding){ 
      message.error(messageInfo);
    }else if(success && loanding){
      message.success(messageInfo);
    };
    setTimeout(()=> { 
      this.setState({ loanding: false, }) 
    }, 3000);
    console.log({thisState: this.state});
  }

  render() {
    let { routes } = this.props;
    let { loanding, collections } = this.state;
    return (
      <div>
        <div className={loanding ? 'loanding' : ''} />
        <Title toBack={false} title="Tablero" subTitle="Cuadrilla para diligenciar tu hoja de vida" />
        <div className="container-page">
          <CardLists collections={collections}/>
        </div>
      </div>
    );
  }
}


export default DashboardPage;