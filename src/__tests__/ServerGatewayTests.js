import React from 'react';
import sinon from 'sinon';
import ServerGatewayADD2 from "../DataAccess/ServerGatewayADD2";

describe('Server Gateway Tests', () => {
    let gateway;
    const errorFunc = jest.fn();
    function jsonResponse (status, body) {
        let mockResponse =
            new window.Response(JSON.stringify(body), {
                status: status,
                headers: {'Content-type': 'application/json'}
            });
        return Promise.resolve(mockResponse);
    }
    beforeEach(() => {
        gateway = new ServerGatewayADD2();
        sinon.stub(window, 'fetch');
        console.error = errorFunc;
    });
    afterEach(() => {
        window.fetch.restore();
        console.error.mockClear();
    });

    it('gets expected characters', async () => {
        window.fetch.returns(jsonResponse(200, [{id: 1, name: 'test'}, {id: 2, name: 'test 2'}]));

        const data = await gateway.getCharacters();

        expect(data).toHaveLength(2);
        expect(data[0].name).toBe('test');
        expect(data[1].name).toBe('test 2');
    });

    it('writes to console.error if response is not ok', async () => {
        window.fetch.returns(jsonResponse(500, 'bad stuff happened'));

        const data = await gateway.getCharacters();

        assertError(errorFunc.mock.calls[0][0], '"bad stuff happened"', data);
    });

    it('can create a character without error', async () => {
        window.fetch.returns(jsonResponse(200));
        await gateway.createCharacter({name: 'create'});
    });

    it('can update a character without error', async () => {
        window.fetch.returns(jsonResponse(200));
        await gateway.updateCharacter({id: 1, name: 'update'});
    });

    it('can delete a character without error', async () => {
        window.fetch.returns(jsonResponse(200));
        await gateway.deleteCharacter(0);
    });

    it('gets expected rolls', async () => {
        window.fetch.returns(jsonResponse(200, [[1, 1, 1], [2, 2, 2]]));

        const data = await gateway.rollStats('test');

        expect(data).toHaveLength(2);
        expect(data[0]).toEqual([1, 1, 1]);
        expect(data[1]).toEqual([2, 2, 2]);
    });

    it('writes to console.error if rolling stats fails', async () => {
        window.fetch.returns(jsonResponse(500, 'rolling stats failed'));

        const data = await gateway.rollStats('test');

        assertError(errorFunc.mock.calls[0][0], '"rolling stats failed"', data);
    });

    it('gets expected races', async () => {
        window.fetch.returns(jsonResponse(200, ['race1', 'race2']));

        const data = await gateway.getRaces({});

        expect(data).toHaveLength(2);
        expect(data[0]).toBe('race1');
        expect(data[1]).toBe('race2');
    });

    it('writes to console.error if getting races fails', async () => {
        window.fetch.returns(jsonResponse(500, 'getting races failed'));

        const data = await gateway.getRaces({});

        assertError(errorFunc.mock.calls[0][0], '"getting races failed"', data);
    });

    it('gets expected stat adjustments', async () => {
        window.fetch.returns(jsonResponse(200, [{key: 'str', value: 1}, {key: 'dex', value: -1}]));

        const data = await gateway.getAdjustments('');

        expect(data).toHaveLength(2);
        expect(data[0].key).toBe('str');
        expect(data[0].value).toBe(1);
        expect(data[1].key).toBe('dex');
        expect(data[1].value).toBe(-1);
    });

    it('writes to console.error if getting adjustments fails', async () => {
        window.fetch.returns(jsonResponse(500, 'getting adjustments failed'));

        const data = await gateway.getAdjustments('');

        assertError(errorFunc.mock.calls[0][0], '"getting adjustments failed"', data);
    });

    it('gets expected classes', async () => {
        window.fetch.returns(jsonResponse(200, ['class1', 'class2']));

        const data = await gateway.getClasses({});

        expect(data).toHaveLength(2);
        expect(data[0]).toBe('class1');
        expect(data[1]).toBe('class2');
    });

    it('writes to console.error if getting classes fails', async () => {
        window.fetch.returns(jsonResponse(500, 'getting classes failed'));

        const data = await gateway.getClasses({});

        assertError(errorFunc.mock.calls[0][0], '"getting classes failed"', data);
    });

    it('gets expected alignments', async () => {
        window.fetch.returns(jsonResponse(200, ['alignment1', 'alignment2']));

        const data = await gateway.getAlignments('testClass');

        expect(data).toHaveLength(2);
        expect(data[0]).toBe('alignment1');
        expect(data[1]).toBe('alignment2');
    });

    it('writes to console.error if getting alignments fails', async () => {
        window.fetch.returns(jsonResponse(500, 'getting alignments fails'));

        const data = await gateway.getAlignments('test');

        assertError(errorFunc.mock.calls[0][0], '"getting alignments fails"', data);
    });

    it('gets expected height/weight/age', async () => {
        window.fetch.returns(jsonResponse(200, [1, 2, 3]));

        const data = await gateway.getHWA('', '');

        expect(data).toHaveLength(3);
        expect(data[0]).toBe(1);
        expect(data[1]).toBe(2);
        expect(data[2]).toBe(3);
    });

    it('writes to console.error if getting height/weight/age fails', async () => {
        window.fetch.returns(jsonResponse(500, 'getting h/w/a failed'));

        const data = await gateway.getHWA('', '');

        assertError(errorFunc.mock.calls[0][0], '"getting h/w/a failed"', data);
    });

    it('gets expected hp/gp', async () => {
        window.fetch.returns(jsonResponse(200, [1, 2]));

        const data = await gateway.getHPGP('');

        expect(data).toHaveLength(2);
        expect(data[0]).toBe(1);
        expect(data[1]).toBe(2);
    });

    it('writes to console.error if getting hp/gp fails', async () => {
        window.fetch.returns(jsonResponse(500, 'getting hp/gp failed'));

        const data = await gateway.getHPGP('');

        assertError(errorFunc.mock.calls[0][0], '"getting hp/gp failed"', data);
    });

    it('gets expected final attributes', async () => {
        window.fetch.returns(jsonResponse(200, [1, 2, 3, 4, 5, 6]));

        const data = await gateway.getFinalAttributes('', '');

        expect(data).toHaveLength(6);
        expect(data[0]).toBe(1);
        expect(data[1]).toBe(2);
        expect(data[2]).toBe(3);
        expect(data[3]).toBe(4);
        expect(data[4]).toBe(5);
        expect(data[5]).toBe(6);
    });

    it('writes to console.error if getting final attributes fails', async () => {
        window.fetch.returns(jsonResponse(500, 'getting final attributes failed'));

        const data = await gateway.getFinalAttributes('', '');

        assertError(errorFunc.mock.calls[0][0], '"getting final attributes failed"', data);
    });

    const assertError = (errorArg, text, data) => {
        expect(errorFunc).toHaveBeenCalledTimes(1);
        expect(errorArg.status).toBe(500);
        expect(errorArg._bodyText).toBe(text);
        expect(data).toBeUndefined();
    };
});