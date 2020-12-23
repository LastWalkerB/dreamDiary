import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './components/home.js';
import Dream from './components/dreams.js';

const App = () => {
    return(
        <BrowserRouter>
            <Route
                path='/'
                exact component={Home}/>
            <Route
                path='/myDreams'
                exact component={Dream}/>
        </BrowserRouter>
    );
};

export default App;
