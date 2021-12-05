import React, { Component } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import SelectorHome from "./GameSelection/SelectorHome";
import SelectorADD2 from "./GameSelection/SelectorADD2";
import SelectorDD35 from "./GameSelection/SelectorDD35";
import LocalGatewayDD35 from "./DataAccess/LocalGatewayDD35";
import ServerGatewayDD35 from "./DataAccess/ServerGatewayDD35";
import Urls from "./ApiUrls";

export default class MainApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedService: ''
    };

    this.handleSelectService = this.handleSelectService.bind(this);
  }

  handleSelectService(e) {
    this.setState({ selectedService: e.target.value });
  }

  getDD35Gateway = () => {
    const { selectedService } = this.state;
    const { env } = this.props;

    if(selectedService === 'local')
      return new LocalGatewayDD35();
    else if(selectedService === 'netcore')
      return new ServerGatewayDD35(Urls.DD35Url(env));
    else
      return new LocalGatewayDD35();
  };

  render() {
    return(
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
              <Route path='/' element={ <SelectorHome onSelectService={ this.handleSelectService } /> }/>
              <Route path='/add2' element={ <SelectorADD2 /> }/>
              <Route path='/dd35' element={ <SelectorDD35 gateway={ this.getDD35Gateway() } /> }/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
