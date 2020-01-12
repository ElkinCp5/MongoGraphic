import React from "react";
import { PageHeader, Button, Descriptions , Icon} from "antd";


let Sdash = (props) => {
    let {title, headsubTitle, subTitle, toBack, buttons =[] } = props;
    return (
        <div className="page-header">
            <PageHeader className={'header-heading'}
                ghost={false}
                onBack={() => window.history.back()}
                title={title}
                subTitle={false}
                extra={
                    buttons.length ? buttons.map((prop, index)=>{
                        return <Button type="primary" shape="circle" icon={prop.icon} key={index} />
                    }): null
                } 
                >
                <Descriptions size="small" column={1}>
                    <Descriptions.Item label={headsubTitle || 'undefined'}>{subTitle}</Descriptions.Item>
            </Descriptions>
            </PageHeader>
        </div>
    );
}

export default Sdash;

