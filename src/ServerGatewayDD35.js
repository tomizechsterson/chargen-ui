import Urls from './ApiUrls';

export default class ServerGatewayDD35 {
    getNew = async () => {
        const response = await fetch(Urls.DD35Url(), {headers: {'Content-type': 'application/json'}});
        if(response.ok) {
            return await response.json();
        }
        else
            console.error(response);
    };

    createCharacter = async (character) => {
        const headers = new Headers({'Content-type': 'application/json'});
        await fetch(Urls.DD35Url(), {method: 'post', headers: headers, body: JSON.stringify(character)});
    };

    deleteCharacter = async (id) => {
        await fetch (Urls.DD35Url() + id, {method: 'delete', headers: {'Content-type': 'application/json'}});
    };
}