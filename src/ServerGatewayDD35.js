import Urls from './ApiUrls';
import ServerCall from './ServerCall';

export default class ServerGatewayDD35 {
    constructor() {
        this.serverCall = new ServerCall();
    }

    getChars = (onResponse, onError) => {
        this.serverCall.doGet(onResponse, onError, Urls.DD35Url());
    };

    createChar = (character, onResponse, onError) => {
        this.serverCall.doRequestWithBody(onResponse, onError, 'post', Urls.DD35Url(), character);
    };

    deleteChar = (id, onResponse, onError) => {
        this.serverCall.doDelete(onResponse, onError, Urls.DD35Url() + id);
    };
}