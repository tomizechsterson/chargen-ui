export default class Urls {
    static ADD2Url = () => {
        return process.env.NODE_ENV === 'development'
            ? 'http://localhost:43000/'
            : 'https://add2ent-dev.azurewebsites.net/api/add2character/';
    };

    static DD35Url = () => {
        return process.env.NODE_ENV === 'development'
            ? 'http://localhost:43002/'
            : 'https://dd35ent-dev.azurewebsites.net/api/';
    }
}