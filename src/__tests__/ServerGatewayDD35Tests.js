import React from 'react';
import sinon from 'sinon';
import ServerGatewayDD35 from "../ServerGatewayDD35";

describe('Server Gateway DD35 Tests', () => {
    it('getNew returns expected data when response is ok', async () => {
        const gateway = new ServerGatewayDD35();
        sinon.stub(window, 'fetch');
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
        window.fetch.returns(
            jsonOk({id: 1, name: 'test'})
        );

        const data = await gateway.getNew();

        expect(data.id).toBe(1);
        expect(data.name).toBe('test');
        window.fetch.restore();
    });

    it('writes to console.error if response is not ok', async () => {
        const errorFunc = jest.fn();
        console.error = errorFunc;
        const gateway = new ServerGatewayDD35();
        sinon.stub(window, 'fetch');
        function jsonNotOk (body) {
            let mockResponse =
                new window.Response(JSON.stringify(body), {
                    status: 500,
                    headers: {'Content-type': 'application/json'}
                });
            return Promise.resolve(mockResponse);
        }
        window.fetch.returns(
            jsonNotOk()
        );

        const data = await gateway.getNew();

        expect(errorFunc).toHaveBeenCalledTimes(1);
        expect(data).toBeUndefined();
        window.fetch.restore();
    });

    it('can create a character without error', async () => {
        const gateway = new ServerGatewayDD35();
        sinon.stub(window, 'fetch');
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
        window.fetch.returns(
            jsonOk()
        );

        await gateway.createCharacter({name: 'create'});
        window.fetch.restore();
    });

    it('can delete a character without error', async () => {
        const gateway = new ServerGatewayDD35();
        sinon.stub(window, 'fetch');
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
        window.fetch.returns(
            jsonOk()
        );

        await gateway.deleteCharacter(0);
        window.fetch.restore();
    });
});