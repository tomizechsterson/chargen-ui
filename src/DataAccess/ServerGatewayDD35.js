import Urls from '../ApiUrls';

export default class ServerGatewayDD35 {
  get = async () => {
    const response = await fetch(Urls.DD35Url(), { headers: { 'Content-type': 'application/json' } });
    if (response.ok) {
      return await response.json();
    } else
      console.error(response);
  };

  createCharacter = async (character) => {
    const headers = new Headers({ 'Content-type': 'application/json' });
    await fetch(Urls.DD35Url(), { method: 'post', headers: headers, body: JSON.stringify(character) });
  };

  deleteCharacter = async (id) => {
    await fetch(Urls.DD35Url() + id, { method: 'delete', headers: { 'Content-type': 'application/json' } });
  };

  getLocal = () => {
    return localStorage.getItem('localCharacters');
  };

  createLocal = (character) => {
    let list = JSON.parse(localStorage.getItem('localCharacters'));
    if (list) {
      const newList = list.concat(character);
      localStorage.setItem('localCharacters', JSON.stringify(newList));
    } else {
      const newList = [];
      newList.push(character);
      localStorage.setItem('localCharacters', JSON.stringify(newList));
    }
  };

  deleteLocal = (id) => {
    const list = [...JSON.parse(localStorage.getItem('localCharacters'))];
    const updatedList = list.filter(item => item.id !== id);
    localStorage.setItem('localCharacters', JSON.stringify(updatedList));
  };
}
