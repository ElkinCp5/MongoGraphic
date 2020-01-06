import React, { Component } from "react";
/* Import Custom Components */
/* import Layout from "../../layouts/standar/standerLayout"; */
import { Layout} from "antd";

class Verify extends Component {

  render() {
    return (
      <Layout className="login-page">
          <h1>Esta cuenta no asido verificada</h1>
      </Layout>
    );
  }
}

export default Verify;