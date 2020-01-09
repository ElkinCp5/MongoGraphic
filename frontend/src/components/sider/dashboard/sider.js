import React, {Component} from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Button, Icon} from "antd";
import "./sider.css";

let { Sider } = Layout;

class  Sdash extends Component {
    constructor(props) {
        super(props);
        this.state = {
          collapsed: false,
        };
    }
    
    render() {
        let {logoName, logoE, onCollapsed, collapsed, pathname } = this.props;
        
        return (
            <Sider className=".animation" trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                  <img src={logoName} className={"animation"}/>
                  <img src={logoE} className={"animation"}/>
                </div>
                <Button className="close-sider"
                    type="link" 
                    shape="circle" 
                    icon={"close-circle"}
                    onClick={onCollapsed}
                />
                <Menu  mode="inline" defaultSelectedKeys={[pathname]}>
                    <Menu.Item key="/dashboard">
                        <Link to="/dashboard">
                            <Icon type="profile" />
                            <span>Inicio</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/dashboard/collections">
                        <Link to="/dashboard/collections">
                            <Icon type="profile" />
                            <span>Collections</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/dashboard/documents">
                        <Link to="/dashboard/documents">
                            <Icon type="solution" />
                            <span>Documents</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/dashboard/profile">
                        <Link to="/dashboard/profile">
                            <Icon type="user" />
                            <span>Perfil</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        );   
    }
}

export default Sdash;

