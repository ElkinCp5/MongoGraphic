import React from "react";
import { Link } from "react-router-dom";
import { Layout, Icon } from "antd";
import "./cardDash.css";


let Card = (props) => {
    let { title, description, url, icon, index } = props;

    title       = (title && title != '') ? title : "undefined";
    description = (description && description != '') ? description : "undefined";
    url         = (url && url != '') ? url : "undefined";
    icon        = (icon && icon != '') ? icon : "close-circle";
    index         = (index && index != '') ? index : 'undefined';
    return (
        <div className="card-dash-button grid-card-dash" key={`card--${index}`}>
            <Link to={url} name={title}>
            <div className="card-icon">
                <div className="circle">
                    <Icon type={icon} />
                </div>
            </div>
            <div className="card-info">
                <h4 className="title">{title}</h4>
                <p className="description">{description}</p>
            </div>
            </Link>
        </div>
    );
}

export default Card;