import StartContainer from "./pages/Start/containers/StartContainer";

require('./bootstrap');
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import { BrowserRouter } from "react-router-dom";
import {Router} from "./routes/Routes";

const root = document.getElementById('root');

ReactDOM.render(
    <BrowserRouter>
        <Header />
        <Router />
    </BrowserRouter>
    , root);
