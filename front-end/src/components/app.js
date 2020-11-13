import React from 'react';
import { Route } from 'react-router-dom';

import ModelProvider from './context';
import Header from './Header';
import HomePage from './HomePage';
import Blush from './body/Blush';
import Bronzer from './body/Bronzer';
import Eyebrow from './body/Eyebrow';
import Eyeliner from './body/Eyeliner';
import Eyeshadow from './body/Eyeshadow';
import Foundation from './body/Foundation';
import LipLiner from './body/LipLiner';
import Lipstick from './body/Lipstick';
import Mascara from './body/Mascara';
import NailPolish from './body/NailPolish';
import './app.scss';

function App(props) {
    return (
        <ModelProvider>

            <Header/>
            <Route exact path='/' render={()=><HomePage/>}></Route>
            <Route exact path='/blush' render={()=><Blush/>}></Route>
            <Route exact path='/bronzer' render={()=><Bronzer/>}></Route>
            <Route exact path='/eyebrow' render={()=><Eyebrow/>}></Route>
            <Route exact path='/eyeliner' render={()=><Eyeliner/>}></Route>
            <Route exact path='/eyeshadow' render={()=><Eyeshadow/>}></Route>
            <Route exact path='/foundation' render={()=><Foundation/>}></Route>
            <Route exact path='/lipLiner' render={()=><LipLiner/>}></Route>
            <Route exact path='/lipstick' render={()=><Lipstick/>}></Route>
            <Route exact path='/mascara' render={()=><Mascara/>}></Route>
            <Route exact path='/nailPolish' render={()=><NailPolish/>}></Route>

        </ModelProvider>

    );
}

export default App;