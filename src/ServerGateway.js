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

    add7Dice = (onResponse, onError) => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', Urls.ADD2Url() + 'rollstats/AddSevenDice', true);
        xhr.onload = function() {
            if(xhr.status === 200)
                onResponse(JSON.parse(xhr.responseText));
            else
                onError(xhr.responseText);
        };
        xhr.send();
    };

    getRaces = (selectedChar, onResponse, onError) => {
        const c = selectedChar;
        const statsInUrl = c.str + '/' + c.dex + '/' + c.con + '/' + c.int + '/' + c.wis + '/' + c.chr;
        const xhr = new XMLHttpRequest();
        xhr.open('get', Urls.ADD2Url() + 'races/' + statsInUrl, true);
        xhr.onload = function() {
            if(xhr.status === 200)
                onResponse(JSON.parse(xhr.responseText));
            else
                onError(xhr.responseText);
        };
        xhr.send();
    };

    getAdjustments = (selectedRace, onResponse, onError) => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', Urls.ADD2Url() + 'statadjust/' + selectedRace, true);
        xhr.onload = function() {
            if(xhr.status === 200)
                onResponse(JSON.parse(xhr.responseText));
            else
                onError(xhr.responseText);
        };
        xhr.send();
    };

    getClasses = (selectedChar, onResponse, onError) => {
        const c = selectedChar;
        const url = c.race + '/' + c.str + '/' + c.dex + '/' + c.con + '/' + c.int + '/' + c.wis + '/' + c.chr;
        const xhr = new XMLHttpRequest();
        xhr.open('get', Urls.ADD2Url() + 'classes/' + url, true);
        xhr.onload = function() {
            if(xhr.status === 200)
                onResponse(JSON.parse(xhr.responseText));
            else
                onError(xhr.responseText);
        };
        xhr.send();
    };

    getAlignments = (className, onResponse, onError) => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', Urls.ADD2Url() + 'alignment/' + className, true);
        xhr.onload = function() {
            if(xhr.status === 200)
                onResponse(JSON.parse(xhr.responseText));
            else
                onError(xhr.responseText);
        };
        xhr.send();
    };
}