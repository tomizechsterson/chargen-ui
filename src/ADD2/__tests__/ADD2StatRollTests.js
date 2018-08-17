import React from 'react';
import ReactDOM from 'react-dom';
import {mount} from 'enzyme';
import ADD2StatRoll from '../ADD2StatRoll';

describe('ADD2 Stat Roll', () => {
    it('renders without exploding', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ADD2StatRoll/>, div);
    });
});