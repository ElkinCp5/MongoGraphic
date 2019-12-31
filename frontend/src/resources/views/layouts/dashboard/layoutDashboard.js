import React, {Component} from "react";
import {
  BrowserRouter as Router,
  Switch,
  withRouter
} from "react-router-dom";
import { Helper } from '../../../../utils';
import { Layout } from "antd";
import { Hdashboards as Header} from "../../../../components/header";
import { Sdashboards as Sider } from "../../../../components/sider";

import { ECcolor, EDcolor } from "../../../images";
import "./dashboard.css";
/* Import Custom Components */

let { RouteWithSubRoutes } = Helper;
let { Content} = Layout;



class dashboardLayout extends Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  
  componentDidMount() {

  }
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      isToggleOn: false,
      isMobile: false
    };
    /*this.toggleCollapsed = this.toggleCollapsed.bind(this);*/
    /*this.bodyScroll(this.toggleCollapsed);*/
  }

  render() {
    let { location, routes } = this.props;
    let { pathname } = location;
    return (
      <Router>
        <Layout className="dashboard">
          <Sider pathname={pathname} logoName={EDcolor} logoE={ECcolor} onCollapsed={this.toggle} collapsed={this.state.collapsed}/>
          <Layout>
            <Header  collapsed={this.state.collapsed} onCollapsed={this.toggle} />

            <Content
              style={{
                background: 'transparent',
                minHeight: "100vh",
              }}
            >
              <Switch>
                {
                   routes.map((route, index) => (
                    <RouteWithSubRoutes key={index} {...route} />
                  ))
                 
                }
                {
                  console.log('dashboard Route: ',routes)
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
