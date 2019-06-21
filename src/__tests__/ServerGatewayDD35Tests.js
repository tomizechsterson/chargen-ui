import React from 'react';
import sinon from 'sinon';
import ServerGatewayDD35 from "../DataAccess/ServerGatewayDD35";

describe('Server Gateway DD35 Tests', () => {
    let gateway;
    function jsonOk (body) {
        let mockResponse =
            new window.Response(JSON.stringify(body), {
                status: 200,
                headers: {
                    'Content-type': 'application/json'
                }
            });
        return Promise.resolve(mockResponse);
    }
    beforeEach(() => {
        gateway = new ServerGatewayDD35();
        sinon.stub(window, 'fetch');
    });
    afterEach(() => {
        window.fetch.restore();
    });

    it('get returns expected data when response is ok', async () => {
        window.fetch.returns(jsonOk({id: 1, name: 'test'}));

        const data = await gateway.get();

        expect(data.id).toBe(1);
        expect(data.name).toBe('test');
    });

    it('writes to console.error if response is not ok', async () => {
        const errorFunc = jest.fn();
        console.error = errorFunc;
        function jsonNotOk (body) {
            let mockResponse =
                new window.Response(JSON.stringify(body), {
                    status: 500,
                    headers: {'Content-type': 'application/json'}
                });
            return Promise.resolve(mockResponse);
        }
        window.fetch.returns(jsonNotOk());

        const data = await gateway.get();

        expect(errorFunc).toHaveBeenCalledTimes(1);
        expect(data).toBeUndefined();
    });

    it('can create a character without error', async () => {
        window.fetch.returns(jsonOk());
        await gateway.createCharacter({name: 'create'});
    });

    it('can delete a character without error', async () => {
        window.fetch.returns(jsonOk());
        await gateway.deleteCharacter(0);
    });
});