import Urls from "./ApiUrls";

export default class ServerGateway {
    getChars = (onResp, onError) => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', Urls.ADD2Url(), true);
        xhr.onload = function() {
            if(xhr.readyState === xhr.DONE) {
                if(xhr.status === 200) {
                    onResp(JSON.parse(xhr.responseText));
                }
                else {
                    onError(xhr.responseText);
                }
            }
        };
        xhr.send();
    };

    deleteChar = (id, onResp, onError) => {
        const xhr = new XMLHttpRequest();
        xhr.open('delete', Urls.ADD2Url() + id, true);
        xhr.onload = function() {
            if(xhr.readyState === xhr.DONE) {
                if(xhr.status === 200) {
                    onResp();
                }
                else {
                    onError(xhr.responseText);
                }
            }
        };
        xhr.send();
    };

    updateChar = (character, onResp, onError) => {
        const xhr = new XMLHttpRequest();
        xhr.open('put', Urls.ADD2Url() + character.id, true);
        xhr.onload = function() {
            if(xhr.readyState === xhr.DONE) {
                if(xhr.status === 200) {
                    onResp();
                }
                else {
                    onError(xhr.responseText);
                }
            }
        };
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send(JSON.stringify(character));
    };

    createChar = (character, onResp, onError) => {
        const xhr = new XMLHttpRequest();
        xhr.open('post', Urls.ADD2Url() + 'new', true);
        xhr.onload = function() {
            if(xhr.readyState === xhr.DONE) {
                if(xhr.status === 200) {
                    onResp();
                }
                else {
                    onError(xhr.responseText);
                }
            }
        };
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send(JSON.stringify(character));
    };
}