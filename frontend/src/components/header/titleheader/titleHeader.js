import React from "react";
import { PageHeader, Button, Descriptions , Tooltip } from "antd";
import helper from '../../../utils/helper';
const { buttonToHistory } = helper;

let Sdash = (props) => {
    let {title, headsubTitle, subTitle, toBack, buttons =[], history} = props;

    return (
        <div className="page-header">
            <PageHeader className={'header-heading'}
                ghost={false}
                onBack={() => window.history.back()}
                title={title}
                subTitle={false}
                extra={
                    buttons.length ? buttons.map((prop, index)=>{
                        return (
                            <Tooltip placement="topLeft" title={prop.tooltip}>
                                <Button type="primary" shape="circle" icon={prop.icon} key={index} onClick={() =>{
                                    return (history &&  prop.url) ? 
                                    buttonToHistory(history, prop.url): 
                                    console.log('history &&  prop.url undefined');
                                }}/>
                            </Tooltip>
                        )
                    }): null
                } 
                >
                <Descriptions size="small" column={1}>
                    <Descriptions.Item label={(headsubTitle || 'undefined')}>{subTitle}</Descriptions.Item>
                </Descriptions>
            </PageHeader>
        </div>
    );
}

export default Sdash;

