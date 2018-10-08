import Urls from './ApiUrls';

export default class ServerGatewayDD35 {
    getNew = async () => {
        try {
            const response = await fetch(Urls.DD35Url(), {headers: {'Content-type': 'application/json'}});
            if(response.ok) {
                return await response.json();
            }
            else
                console.error(response);
        } catch(e) {
            throw Error(e);
        }
    };

    createCharacter = async (character) => {
        try {
            const headers = new Headers({'Content-type': 'application/json'});
            await fetch(Urls.DD35Url(), {method: 'post', headers: headers, body: JSON.stringify(character)});
        } catch(e) {
            throw Error(e);
        }
    };

    deleteCharacter = async (id) => {
        try {
            await fetch (Urls.DD35Url() + id, {method: 'delete', headers: {'Content-type': 'application/json'}});
        } catch(e) {
            throw Error(e);
        }
    };
}