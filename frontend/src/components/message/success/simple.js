import React, { Component } from "react";
import { message } from "antd";

class Message extends Component {
  render() {
    let {text } = this.props;
    return (
        message.success(text || 'This is a success message')
    );
  }
}

export default Message;