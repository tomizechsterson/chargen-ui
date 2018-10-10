import React from 'react';
import {shallow} from 'enzyme';
import ADD2Characters from '../ADD2Characters';

describe('ADD2Characters tests', () => {
    function baseMockGateway() {return {getCharsNew: () => {return []}}}
    it('always renders a top-level div', async () => {
        const component = shallow(<ADD2Characters useTestData={true} serverGateway={baseMockGateway()}/>);
        expect(component.find('div').length).toBeGreaterThan(0);
    });

    describe('Creating Characters', () => {

    });
});