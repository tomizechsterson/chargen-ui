import React, {Component} from 'react';
import {Route, NavLink, HashRouter} from "react-router-dom";
import './App.css';
import Home from "./Home";
import ADD2 from "./ADD2";
import DD35 from "./DD35";

class App extends Component {
    render() {
        return (
            <HashRouter>
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Character Generator</h1>
                    </header>
                    <ul className="selectorHeader">
                        <li><NavLink exact to="/">Home</NavLink></li>
                        <li><NavLink to="/add2">AD&D 2nd Edition</NavLink></li>
                        <li><NavLink to="/dd35">D&D 3.5</NavLink></li>
                    </ul>
                    <div className="selectorContent">
                        <Route exact path="/" component={Home} />
                        <Route path="/add2" component={ADD2} />
                        <Route path="/dd35" component={DD35} />
                    </div>

                </div>
            </HashRouter>
        );
    }
}

export default App;
