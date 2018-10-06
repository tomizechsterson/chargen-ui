import Urls from './ApiUrls';
import ServerCall from './ServerCall';

export default class ServerGatewayDD35 {
    constructor() {
        this.serverCall = new ServerCall();
    }

    getChars = (onResponse, onError) => {
        this.serverCall.doGet(onResponse, onError, Urls.DD35Url());
    };
/*
    getNew = async () => {
        try {
            const response = await fetch(Urls.DD35Url(), {headers: {'Content-type': 'application/json'}});
            if(response.ok) {
                return await response.json();
            }
        } catch(e) {
            throw Error(e);
        }
    };
*/
    createNew = async (character) => {
        try {
            const headers = new Headers({'Content-type': 'application/json'});
            await fetch(Urls.DD35Url(), {method: 'post', headers: headers, body: JSON.stringify(character)});
        } catch(e) {
            throw Error(e);
        }
    };

    deleteNew = async (id) => {
        try {
            await fetch (Urls.DD35Url() + id, {method: 'delete', headers: {'Content-type': 'application/json'}});
        } catch(e) {
            throw Error(e);
        }
    };
}