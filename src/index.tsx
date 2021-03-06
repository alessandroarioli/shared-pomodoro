import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {LMWebSocket} from "./logic/websocket/websocket";

const webSocket = new LMWebSocket('ws://localhost:8080/')

webSocket.listen()

window.onbeforeunload = () => {
  return "";
}

ReactDOM.render(
  <React.StrictMode>
    <App websocket={webSocket} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
