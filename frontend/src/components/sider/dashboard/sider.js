import qs from "qs";
import Settings from "../../../redux/settings";
import React, {Component} from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Button, Icon} from "antd";
import "./sider.css";
let idUrl = (url, subUrl)=>{
    for(var element in subUrl){
        /*console.log(url, subUrl[element]);*/
        if(subUrl[element].url === url || url.includes(subUrl[element].key)) { 
          url = subUrl[element].url 
          break;
        } else{ continue; };
        
    };
    return url;
}

let { Sider } = Layout;

class  Sdash extends Component {
    constructor(props) {
        super(props);
        this.state = {
          collapsed: false,
        };
    }
    
    render() {
        let {logoName, logoE, onCollapsed, collapsed, search, pathname } = this.props;
        /*let query = qs.parse(search.replace("?", ""));
        Settings.theme = query.theme !== "dark" && query.theme !== "light" 
                    ? "light" 
                    : query.theme;*/
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
                <Menu  mode="inline" 
                defaultSelectedKeys={"/dashboard"}>
                    <Menu.Item key="/dashboard">
                        <Link to="/dashboard">
                            <Icon type="home" />
                            <span>Home</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/dashboard/collections">
                        <Link to="/dashboard/collections">
                            <Icon type="database" />
                            <span>Schemas</span>
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

