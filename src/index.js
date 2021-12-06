import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router } from './app/router/router';
import { BrowserRouter, useLocation } from "react-router-dom";
import "rsuite/dist/rsuite.min.css";
import { Container } from 'rsuite';
import { MySidebar } from './app/components/Sidebar';
import { RecoilRoot } from 'recoil';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
      <Container style={{ height: '100%' }}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Container>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
