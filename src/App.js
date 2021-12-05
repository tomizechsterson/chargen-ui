import React from 'react';
import './App.css';
import MainApp from "./MainApp";

const App = () => (
  <MainApp env={ process.env.NODE_ENV } />
);
export default App;
