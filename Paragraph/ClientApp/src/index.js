import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Paragraph from './components/Paragraph'
import registerServiceWorker from './registerServiceWorker'

//const baseUrl = window.location.origin
const rootElement = document.getElementById('root')

ReactDOM.render(
  <BrowserRouter>
        <Paragraph />
  </BrowserRouter>,
  rootElement);

registerServiceWorker();
