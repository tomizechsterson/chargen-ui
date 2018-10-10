import Urls from './ApiUrls';
import ServerCall from './ServerCall';

export default class ServerGateway {
    constructor() {
        this.serverCall = new ServerCall();
    }

    getCharsNew = async () => {
        const response = await fetch(Urls.ADD2Url(), {headers: {'Content-type': 'application/json'}});
        if(response.ok)
            return await response.json();
        else
            console.error(response);
    };

    deleteCharNew = async (id) => {
        await fetch(Urls.ADD2Url() + id, {method: 'delete', headers: {'Content-type': 'application/json'}});
    };

    updateCharNew = async (character) => {
        const headers = new Headers({'Content-type': 'application/json'});
        await fetch(Urls.ADD2Url() + character.id, {method: 'put', headers: headers, body: JSON.stringify(character)});
    };

    createCharNew = async (character) => {
        const headers = new Headers({'Content-type': 'application/json'});
        await fetch(Urls.ADD2Url(), {method: 'post', headers: headers, body: JSON.stringify(character)});
    };

    rollStats = (rollRule, onResponse, onError) => {
        this.serverCall.doGet(onResponse, onError, Urls.ADD2Url() + rollRule);
    };

    getRacesNew = async (character) => {
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

    getAdjustments = (selectedRace, onResponse, onError) => {
        this.serverCall.doGet(onResponse, onError, Urls.ADD2Url() + 'statadjust/' + selectedRace);
    };

    getClassesNew = async (character) => {
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

    getAlignmentsNew = async (className) => {
        const response = await fetch(Urls.ADD2Url() + 'alignment/' + className, {headers: {'Content-type': 'application/json'}});
        if(response.ok)
            return await response.json();
        else
            console.error(response);
    };

    getHWA = (race, gender, onResponse, onError) => {
        this.serverCall.doGet(onResponse, onError, Urls.ADD2Url() + 'hwa/' + race + '/' + gender);
    };

    getHPGP = (className, onResponse, onError) => {
        this.serverCall.doGet(onResponse, onError, Urls.ADD2Url() + 'hpgp/' + className);
    };

    getFinalAttributes = (race, className, onResponse, onError) => {
        this.serverCall.doGet(onResponse, onError, Urls.ADD2Url() + 'final/' + race + '/' + className);
    };
}