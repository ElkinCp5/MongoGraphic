import React from 'react';
import ReactDOM from 'react-dom';
import RouterLink from './routes';
import "antd/dist/antd.css"; 
import './css/master.css';
import "./css/global.css";
import "./css/colors.css";
import "./css/fonts.css";
import "./css/media.css";
import "./css/mediaGrid.css";

ReactDOM.render(<RouterLink />, document.getElementById('app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

