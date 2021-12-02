import React from 'react';
import { Routes, Route, NavLink, BrowserRouter } from 'react-router-dom';
import './App.css';
import SelectorHome from './GameSelection/SelectorHome';
import SelectorADD2 from './GameSelection/SelectorADD2';
import SelectorDD35 from './GameSelection/SelectorDD35';

const App = () => (
  <BrowserRouter>
    <div className='App'>
      <header className='App-header'>
        <h1 className='App-title'>Character Generator</h1>
      </header>
      <ul className='selectorHeader'>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/add2'>AD&D 2nd Edition</NavLink></li>
        <li><NavLink to='/dd35'>D&D 3.5</NavLink></li>
      </ul>
      <div className='selectorContent'>
        <Routes>
          <Route path='/' element={ <SelectorHome /> }/>
          <Route path='/add2' element={ <SelectorADD2 /> }/>
          <Route path='/dd35' element={ <SelectorDD35 /> }/>
        </Routes>
      </div>
    </div>
  </BrowserRouter>
);
export default App;
