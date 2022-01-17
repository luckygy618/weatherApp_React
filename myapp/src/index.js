/*********************************************************************************
* BTI425 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: ______________________ Student ID: __________________ Date: ____________________
*
*
********************************************************************************/ 

import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from 'react-router-dom'



ReactDOM.render(
<BrowserRouter>
      <App/>
</BrowserRouter>,document.getElementById('root')
);

