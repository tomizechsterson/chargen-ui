import React from 'react';
import {shallow} from 'enzyme';
import {BrowserRouter} from 'react-router-dom';
import App from '../App';

describe('App component tests', () => {
    it('renders the BrowserRouter', () => {
        const component = shallow(<App/>);
        expect(component.find(BrowserRouter)).toHaveLength(1);
    });
});