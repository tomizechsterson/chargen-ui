export default class Urls {
  static ADD2Url = () => {
    return process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000/api/ADD2Character/'
      : 'https://add2ent-dev.azurewebsites.net/api/add2character/';
  };

  static DD35Url = () => {
    return process.env.NODE_ENV === 'development'
      ? 'http://localhost:5002/api/DD35Character/'
      : 'https://dd35ent-dev.azurewebsites.net/api/';
  }
}
