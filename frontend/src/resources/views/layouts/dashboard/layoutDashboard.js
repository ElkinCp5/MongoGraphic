import React, {Component} from "react";
import {
  BrowserRouter as Router,
  Switch,
  withRouter
} from "react-router-dom";
import { helper as Helper } from '../../../../utils';
import { Layout } from "antd";
import { Hdashboards as Header} from "../../../../components/header";
import { Sdashboards as Sider } from "../../../../components/sider";

import { ECcolor, EDcolor } from "../../../images";
import "./dashboard.css";
/* Import Custom Components */

let { RouteWithSubRoutes } = Helper;
let { Content} = Layout;

class dashboardLayout  extends Component{

  constructor(props) {
    super(props);
    this.state = {
    collapsed: true,
      isToggleOn: false,
      isMobile: false
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle(){
    this.setState({
      collapsed: !this.state.collapsed
    })
  };
  
  render(){
    
    let { collapsed } = this.state
    let { location, routes } = this.props;
    let { pathname } = location;
    return (
      <Router>
        <Layout className="dashboard">
          <Sider pathname={pathname} 
            logoName={EDcolor} 
            logoE={ECcolor} 
            onCollapsed={this.toggle} 
            collapsed={collapsed}/>
          <Layout>
            <Header 
              collapsed={collapsed} 
              onCollapsed={this.toggle} 
            />

            <Content
              style={{
                background: 'transparent',
                minHeight: "100vh",
              }}
            >
              <Switch>
                {
                   routes.map((route, index) => (
                    <RouteWithSubRoutes key={`subroute-${index}`} {...route} />
                  ))
                 
                }
              
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}
export default withRouter(dashboardLayout);
