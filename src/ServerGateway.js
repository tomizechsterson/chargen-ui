import Urls from './ApiUrls';
import ServerCall from './ServerCall';

export default class ServerGateway {
    constructor() {
        this.serverCall = new ServerCall();
    }

    getChars = (onResponse, onError) => {
        this.serverCall.doGet(onResponse, onError, Urls.ADD2Url());
    };

    deleteChar = (id, onResponse, onError) => {
        this.serverCall.doDelete(onResponse, onError, Urls.ADD2Url() + id);
    };

    updateChar = (character, onResponse, onError) => {
        this.serverCall.doRequestWithBody(onResponse, onError, 'put', Urls.ADD2Url() + character.id, character);
    };

    createChar = (character, onResponse, onError) => {
        this.serverCall.doRequestWithBody(onResponse, onError, 'post', Urls.ADD2Url(), character);
    };

    rollStats = (rollRule, onResponse, onError) => {
        this.serverCall.doGet(onResponse, onError, Urls.ADD2Url() + rollRule);
    };

    getRaces = (selectedChar, onResponse, onError) => {
        const c = selectedChar;
        const url = [];
        url.push(Urls.ADD2Url(), 'races/', c.str, '/', c.dex, '/', c.con, '/', c.int, '/', c.wis, '/', c.chr);
        const statsInUrl = url.join('');
        this.serverCall.doGet(onResponse, onError, statsInUrl);
    };

    getAdjustments = (selectedRace, onResponse, onError) => {
        this.serverCall.doGet(onResponse, onError, Urls.ADD2Url() + 'statadjust/' + selectedRace);
    };

    getClasses = (selectedChar, onResponse, onError) => {
        const c = selectedChar;
        const url = [];
        url.push(Urls.ADD2Url(), 'classes/', c.race, '/', c.str, '/', c.dex, '/', c.con, '/', c.int, '/', c.wis, '/', c.chr);
        const fullUrl = url.join('');
        this.serverCall.doGet(onResponse, onError, fullUrl);
    };

    getAlignments = (className, onResponse, onError) => {
        this.serverCall.doGet(onResponse, onError, Urls.ADD2Url() + 'alignment/' + className);
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