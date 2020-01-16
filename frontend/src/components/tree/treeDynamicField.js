import React, { Component } from "react";
import { Tree, Switch, Input, InputNumber } from 'antd';

const { TreeNode } = Tree;

class treeDynamicField extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: undefined,
        };  
    }

    render() {
        return (
        <h1>Hola</h1>
        );
    }
}

export default treeDynamicField;