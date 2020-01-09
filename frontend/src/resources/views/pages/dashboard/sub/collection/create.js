import React, { Component } from "react";
import { 
  Card, 
  Row, 
  Col, 
  Icon, 
  Tooltip, 
  Button, 
  Input, 
  Checkbox 
} from "antd";


/* Import Custom Components */
import { HtitleHeader as Title } from "../../../../../../components/header";


class DashboardPage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  render() {
    let { routes } = this.props;
    return (
      <div>
        <Title toBack={false} title="Tablero" subTitle="Cuadrilla para diligenciar tu hoja de vida" />
        <div className="container-page">
          <h1>
            Collection create
          </h1>
        </div>
      </div>
    );
  }
}


export default DashboardPage;