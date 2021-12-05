export default class ServerGatewayDD35 {
  constructor(url) {
    this.url = url;
  }

  get = async () => {
    const response = await fetch(this.url, { headers: { 'Content-type': 'application/json' } });
    if (response.ok) {
      return await response.json();
    } else
      console.error(response);
  };

  createCharacter = async (character) => {
    const headers = new Headers({ 'Content-type': 'application/json' });
    await fetch(this.url, { method: 'post', headers: headers, body: JSON.stringify(character) });
  };

  deleteCharacter = async (id) => {
    await fetch(this.url + id, { method: 'delete', headers: { 'Content-type': 'application/json' } });
  };
}
