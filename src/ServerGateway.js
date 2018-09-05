import Urls from "./ApiUrls";

export default class ServerGateway {
    getChars = (onResponse, onError) => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', Urls.ADD2Url(), true);
        xhr.onload = function() {
            if(xhr.status === 200)
                onResponse(JSON.parse(xhr.responseText));
            else
                onError(xhr.responseText);
        };
        xhr.send();
    };

    deleteChar = (id, onResponse, onError) => {
        const xhr = new XMLHttpRequest();
        xhr.open('delete', Urls.ADD2Url() + id, true);
        xhr.onload = function() {
            if(xhr.status === 200)
                onResponse();
            else
                onError(xhr.responseText);
        };
        xhr.send();
    };

    updateChar = (character, onResponse, onError) => {
        const xhr = new XMLHttpRequest();
        xhr.open('put', Urls.ADD2Url() + character.id, true);
        xhr.onload = function() {
            if(xhr.status === 200)
                onResponse();
            else
                onError(xhr.responseText);
        };
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send(JSON.stringify(character));
    };

    createChar = (character, onResponse, onError) => {
        const xhr = new XMLHttpRequest();
        xhr.open('post', Urls.ADD2Url() + 'new', true);
        xhr.onload = function() {
            if(xhr.status === 200)
                onResponse();
            else
                onError(xhr.responseText);
        };
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send(JSON.stringify(character));
    };

    rollOnce = (onResponse, onError) => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', Urls.ADD2Url() + 'rollstats/rollonce', true);
        xhr.onload = function() {
            if(xhr.status === 200)
                onResponse(JSON.parse(xhr.responseText));
            else
                onError(xhr.responseText);
        };
        xhr.send();
    };

    rollTwice = (onResponse, onError) => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', Urls.ADD2Url() + 'rollstats/rolltwice', true);
        xhr.onload = function() {
            if(xhr.status === 200)
                onResponse(JSON.parse(xhr.responseText));
            else
                onError(xhr.responseText);
        };
        xhr.send();
    };

    assignment = (assignmentMethod, onResponse, onError) => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', Urls.ADD2Url() + 'rollstats/' + assignmentMethod, true);
        xhr.onload = function() {
            if(xhr.status === 200)
                onResponse(JSON.parse(xhr.responseText));
            else
                onError(xhr.responseText);
        };
        xhr.send();
    };

    rollFour = (onResponse, onError) => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', Urls.ADD2Url() + 'rollstats/rollfour', true);
        xhr.onload = function() {
            if(xhr.status === 200)
                onResponse(JSON.parse(xhr.responseText));
            else
                onError(xhr.responseText);
        };
        xhr.send();
    };
}