import sinon from 'sinon';
import Urls from '../ApiUrls';
import ServerCall from '../ServerCall';

describe('Server call', () => {
    let xhr, requests, serverCall, response, error;
    beforeEach(() => {
        xhr = sinon.useFakeXMLHttpRequest();
        requests = [];
        xhr.onCreate = function(xhr) {
            requests.push(xhr);
        }.bind(this);

        serverCall = new ServerCall();
        response = jest.fn();
        error = jest.fn();
    });
    afterEach(() => {
        xhr.restore();
    });

    it('calls response function on 200 with json data in doGet', () => {
        const dataJson = JSON.stringify([{id: 1, name: 'test1'}, {id: 2, name: 'test2'}]);

        serverCall.doGet(response, error, Urls.ADD2Url());
        requests[0].respond(200, {'Content-Type': 'application/json'}, dataJson);

        expect(response).toHaveBeenCalledTimes(1);
        expect(response).toHaveBeenCalledWith([{id: 1, name: 'test1'}, {id: 2, name: 'test2'}]);
    });

    it('calls error function if not 200 in doGet', () => {
        serverCall.doGet(response, error, Urls.ADD2Url());
        requests[0].respond(500, '', 'test error');

        expect(error).toHaveBeenCalledTimes(1);
        expect(error).toHaveBeenCalledWith('test error');
    });

    it('posts with the expected url and body', () => {
        const testChar = {name: 'test'};
        serverCall.doOthers(response, error, 'post', Urls.ADD2Url(), testChar);
        requests[0].respond(200);

        expect(response).toHaveBeenCalledTimes(1);
        expect(requests[0].method).toEqual('post');
        expect(requests[0].requestBody).toContain('"name":"test"');
    });

    it('puts with the expected url and body', () => {
        const testChar = {id: 2, name: 'test', str: 3, dex: 4, con: 5, int: 6, wis: 7, chr: 8};
        serverCall.doOthers(response, error, 'put', Urls.ADD2Url() + testChar.id, testChar);
        requests[0].respond(200);

        expect(response).toHaveBeenCalledTimes(1);
        expect(requests[0].method).toEqual('put');
        expect(requests[0].url).toEqual(expect.stringMatching(/\/add2character\/2$/));
        expect(requests[0].requestBody).toContain('"id":2');
        expect(requests[0].requestBody).toContain('"name":"test"');
        expect(requests[0].requestBody).toContain('"str":3');
        expect(requests[0].requestBody).toContain('"dex":4');
        expect(requests[0].requestBody).toContain('"con":5');
        expect(requests[0].requestBody).toContain('"int":6');
        expect(requests[0].requestBody).toContain('"wis":7');
        expect(requests[0].requestBody).toContain('"chr":8');
    });

    it('calls error function if not 200 in doOthers', () => {
        serverCall.doOthers(response, error);
        requests[0].respond(500, '', 'test error');

        expect(error).toHaveBeenCalledTimes(1);
        expect(error).toHaveBeenCalledWith('test error');
    });

    it('calls delete with expected url', () => {
        serverCall.doDelete(response, error, Urls.ADD2Url() + '1');
        requests[0].respond(200);

        expect(response).toHaveBeenCalledTimes(1);
        expect(requests[0].url).toEqual(expect.stringMatching(/\/add2character\/1$/));
    });

    it('calls error function if not 200 in doDelete', () => {
        serverCall.doDelete(response, error, Urls.ADD2Url());
        requests[0].respond(500, '', 'test error');

        expect(error).toHaveBeenCalledTimes(1);
        expect(error).toHaveBeenCalledWith('test error');
    });
});