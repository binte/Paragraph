import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Paragraph from './components/Paragraph';
import registerServiceWorker from './registerServiceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
        <Paragraph />
  </BrowserRouter>,
  rootElement);

registerServiceWorker();
