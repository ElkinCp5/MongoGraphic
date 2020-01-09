import React, { Component } from "react";
import { Card, Row, Col, Icon, Tooltip, Button, Input, Checkbox } from "antd";


/* Import Custom Components */
import { layoutDashboard as Dashboard } from "../layouts";
import { HtitleHeader as Title } from "../../../components/header";
import { cardDash as Cards } from "../../../components/cards";


class DashboardStart extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  render() {
    let { routes } = this.props;
    return (
      <Dashboard className="container" routes={routes}/>
    );
  }
}


export default DashboardStart;