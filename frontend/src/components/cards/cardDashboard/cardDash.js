import React from "react";
import { Link } from "react-router-dom";
import { Icon, Button, message as boxMessage, Modal } from "antd";
import Services from '../../../services';
import "./cardDash.css";

const { modelAxios } = Services;
const { confirm } = Modal;

let Card = (props) => {
    let { title, description, url, icon, index, action, loanding } = props;

    title       = (title && title != '') ? title : "undefined";
    description = (description && description != '') ? description : "undefined";
    url         = (url && url != '') ? url : "undefined";
    icon        = (icon && icon != '') ? icon : "close-circle";
    index       = (index && index != '') ? index : 'undefined';

    const showDeleteConfirm = (action)=>{
        confirm({
          title: 'Are you sure delete this schema?',
          content: 'Please note that by deleting this scheme, the data posted on the database will also be deleted.',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            handleDelete(action);
          },
          onCancel() {
            console.log('Cancel');
          },
        });
    }

    const handleDelete = async (action)=>{
        console.log('Action datas: ', action);
        loanding();
        const response = await modelAxios.destroy(action);
        if(response.collections){
            boxMessage.success(response.message);
            setTimeout(()=>{
                window.location.reload();
            }, 3000)
        }else{
            
            setTimeout(()=>{
                boxMessage.error(response.message);
                loanding();
            }, 3000);
        }
    }

    return (
        <div className="card-dash-button grid-card-dash" key={`card--${index}`}>
            {
            action ? (
                <Icon type="delete" className="card-action" onClick={()=> showDeleteConfirm(action)}/>
            ): null
            }
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