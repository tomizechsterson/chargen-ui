import React from 'react';
import {Route, NavLink, BrowserRouter} from 'react-router-dom';
import './App.css';
import SelectorHome from './SelectorHome';
import SelectorADD2 from './SelectorADD2';
import SelectorDD35 from './SelectorDD35';

const App = () => {
    return (
        <BrowserRouter>
            <div className='App'>
                <header className='App-header'>
                    <h1 className='App-title'>Character Generator</h1>
                </header>
                <ul className='selectorHeader'>
                    <li><NavLink exact to='/'>Home</NavLink></li>
                    <li><NavLink to='/add2'>AD&D 2nd Edition</NavLink></li>
                    <li><NavLink to='/dd35'>D&D 3.5</NavLink></li>
                </ul>
                <div className='selectorContent'>
                    <Route exact path='/' component={SelectorHome} />
                    <Route path='/add2' component={SelectorADD2} />
                    <Route path='/dd35' component={SelectorDD35} />
                </div>
            </div>
        </BrowserRouter>
    );
};
export default App;