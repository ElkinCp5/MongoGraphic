import React, { Component } from "react";
import { Card, Row, Col, Icon, Tooltip, Button, Input, Checkbox } from "antd";

/* Import Custom Components */
import { HtitleHeader as Title } from "../../../../components/header";
import { cardDash as Cards } from "../../../../components/cards";

class FormatPage extends Component {
  render() {
    return (
      <div>
        <Title toBack={false} title="Formatos" subTitle="Multiples formatos de hoja de vida" />
        <div className="container-page">
          <Cards 
            title="Nueva hoja cv"
            description="Puedes elegir el estilo de tu curriculum"
            icon="plus-circle"
            url=""
          />
        </div>
      </div>
    );
  }
}


export default FormatPage;