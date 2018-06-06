import React, {Component} from 'react';
import {Route, NavLink, HashRouter} from "react-router-dom";
import './App.css';
import HomeSelector from "./HomeSelector";
import ADD2Selector from "./ADD2/ADD2Selector";
import DD35Selector from "./DD35/DD35Selector";

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
                        <Route exact path="/" component={HomeSelector} />
                        <Route path="/add2" component={ADD2Selector} />
                        <Route path="/dd35" component={DD35Selector} />
                    </div>

                </div>
            </HashRouter>
        );
    }
}
export default App;
