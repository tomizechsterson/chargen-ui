export default class ServerCall {
    doGet = (onResponse, onError, url) => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.onload = function() {
            if(xhr.status === 200)
                onResponse(JSON.parse(xhr.responseText));
            else
                onError(xhr.responseText);
        };
        xhr.send();
    };

    doDelete = (onResponse, onError, url) => {
        const xhr = new XMLHttpRequest();
        xhr.open('delete', url, true);
        xhr.onload = function() {
            if(xhr.status === 200)
                onResponse();
            else
                onError(xhr.responseText);
        };
        xhr.send();
    };

    doOthers = (onResponse, onError, method, url, bodyObject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.onload = function() {
            if(xhr.status === 200)
                onResponse();
            else
                onError(xhr.responseText);
        };
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send(JSON.stringify(bodyObject));
    };
}