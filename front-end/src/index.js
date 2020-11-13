// rsf
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app';


function Main(props) {
    return (
        <BrowserRouter>
          <App/>
        </BrowserRouter>
    );
}

const root =document.querySelector("#root");
ReactDOM.render(<Main/>, root);
