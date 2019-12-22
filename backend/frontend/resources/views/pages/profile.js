import React, { Component } from "react";
import { Card, Row, Col, Icon, Tooltip, Button, Input, Checkbox } from "antd";


/* Import Custom Components */
import { HtitleHeader as Title } from "../../../components/header";
import { cardDash as Cards } from "../../../components/cards";

class ProfilePage extends Component {
  render() {
    return (
      <div>
        <div className="container-page">
          <h1>Perfil laboral publico</h1>
        </div>
      </div>
    );
  }
}

export default ProfilePage;