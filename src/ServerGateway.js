import Urls from './ApiUrls';

export default class ServerGateway {
    getCharacters = async () => {
        const response = await fetch(Urls.ADD2Url(), {headers: {'Content-type': 'application/json'}});
        if(response.ok)
            return await response.json();
        else
            console.error(response);
    };

    deleteCharacter = async (id) => {
        await fetch(Urls.ADD2Url() + id, {method: 'delete', headers: {'Content-type': 'application/json'}});
    };

    updateCharacter = async (character) => {
        const headers = new Headers({'Content-type': 'application/json'});
        await fetch(Urls.ADD2Url() + character.id, {method: 'put', headers: headers, body: JSON.stringify(character)});
    };

    createCharacter = async (character) => {
        const headers = new Headers({'Content-type': 'application/json'});
        await fetch(Urls.ADD2Url(), {method: 'post', headers: headers, body: JSON.stringify(character)});
    };

    rollStats = async (rollRule) => {
        const response = await fetch(Urls.ADD2Url() + rollRule, {headers: {'Content-type': 'application/json'}});
        if(response.ok)
            return await response.json();
        else
            console.error(response);
    };

    getRaces = async (character) => {
        const c = character;
        const url = [];
        url.push(Urls.ADD2Url(), 'races/', c.str, '/', c.dex, '/', c.con, '/', c.int, '/', c.wis, '/', c.chr);
        const statsInUrl = url.join('');
        const response = await fetch(statsInUrl, {headers: {'Content-type': 'application/json'}});
        if(response.ok)
            return await response.json();
        else
            console.error(response);
    };

    getAdjustments = async (selectedRace) => {
        const response = await fetch(Urls.ADD2Url() + 'statadjust/' + selectedRace, {headers: {'Content-type': 'application/json'}});
        if(response.ok)
            return await response.json();
        else
            console.error(response);
    };

    getClasses = async (character) => {
        const c = character;
        const url = [];
        url.push(Urls.ADD2Url(), 'classes/', c.race, '/', c.str, '/', c.dex, '/', c.con, '/', c.int, '/', c.wis, '/', c.chr);
        const fullUrl = url.join('');
        const response = await fetch(fullUrl, {headers: {'Content-type': 'application/json'}});
        if(response.ok)
            return await response.json();
        else
            console.error(response);
    };

    getAlignments = async (className) => {
        const response = await fetch(Urls.ADD2Url() + 'alignment/' + className, {headers: {'Content-type': 'application/json'}});
        if(response.ok)
            return await response.json();
        else
            console.error(response);
    };

    getHWA = async (race, gender) => {
        const response = await fetch(Urls.ADD2Url() + 'hwa/' + race + '/' + gender, {headers: {'Content-type': 'application/json'}});
        if(response.ok)
            return await response.json();
        else
            console.error(response);
    };

    getHPGP = async (className) => {
        const response = await fetch(Urls.ADD2Url() + 'hpgp/' + className, {headers: {'Content-type': 'application/json'}});
        if(response.ok)
            return await response.json();
        else
            console.error(response);
    };

    getFinalAttributes = async (race, className) => {
        const response = await fetch(Urls.ADD2Url() + 'final/' + race + '/' + className, {headers: {'Content-type': 'application/json'}});
        if(response.ok)
            return await response.json();
        else
            console.error(response);
    };
}