
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Steps, Button, Card, message } from "antd";

/* Import Custom Components */
import { layoutStandar as Standar } from "../layouts";
import FormRegiste from "./forms/register/formSignup";
import { Ecolor} from "../../images";
import "./css/login.css"

const { Step } = Steps;

const steps = [
  {
    title: 'First',
    content: 'holasasa',
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];

class Proyect extends Component {
    constructor(props) {
        super(props);
        this.state = {
          current: 0,
        };
      }
    
      next() {
        const current = this.state.current + 1;
        this.setState({ current });
      }
    
      prev() {
        const current = this.state.current - 1;
        this.setState({ current });
      }
  render() {
    const { current } = this.state;
    return (
      <Standar className="login-page">
          <div>
                <Steps current={current}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
                </Steps>
                <div className="steps-content">{steps[current].content}</div>
                <div className="steps-action">
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => this.next()}>
                    Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                    Done
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                    Previous
                    </Button>
                )}
                </div>
        </div>
      </Standar>
    );
  }
}

export default Proyect;