export default class ServerGatewayADD2 {
  constructor(url) {
    this.url = url;
  }

  getCharacters = async () => {
    const response = await fetch(this.url, { headers: { 'Content-type': 'application/json' } });
    if (response.ok)
      return await response.json();
    else
      console.error(response);
  };

  deleteCharacter = async (id) => {
    await fetch(this.url + id, { method: 'delete', headers: { 'Content-type': 'application/json' } });
  };

  updateCharacter = async (character) => {
    const headers = new Headers({ 'Content-type': 'application/json' });
    await fetch(this.url + character.id, { method: 'put', headers: headers, body: JSON.stringify(character) });
  };

  createCharacter = async (character) => {
    const headers = new Headers({ 'Content-type': 'application/json' });
    await fetch(this.url, { method: 'post', headers: headers, body: JSON.stringify(character) });
  };

  rollStats = async (rollRule) => {
    const response = await fetch(this.url + rollRule, { headers: { 'Content-type': 'application/json' } });
    if (response.ok)
      return await response.json();
    else
      console.error(response);
  };

  getRaces = async (character) => {
    const c = character;
    const url = [];
    url.push(this.url, 'races/', c.str, '/', c.dex, '/', c.con, '/', c.int, '/', c.wis, '/', c.chr);
    const statsInUrl = url.join('');
    const response = await fetch(statsInUrl, { headers: { 'Content-type': 'application/json' } });
    if (response.ok)
      return await response.json();
    else
      console.error(response);
  };

  getAdjustments = async (selectedRace) => {
    const response = await fetch(this.url + 'statadjust/' + selectedRace, { headers: { 'Content-type': 'application/json' } });
    if (response.ok)
      return await response.json();
    else
      console.error(response);
  };

  getClasses = async (character) => {
    const c = character;
    const url = [];
    url.push(this.url, 'classes/', c.race, '/', c.str, '/', c.dex, '/', c.con, '/', c.int, '/', c.wis, '/', c.chr);
    const fullUrl = url.join('');
    const response = await fetch(fullUrl, { headers: { 'Content-type': 'application/json' } });
    if (response.ok)
      return await response.json();
    else
      console.error(response);
  };

  getAlignments = async (className) => {
    const response = await fetch(this.url + 'alignment/' + className, { headers: { 'Content-type': 'application/json' } });
    if (response.ok)
      return await response.json();
    else
      console.error(response);
  };

  getHWA = async (race, gender) => {
    const response = await fetch(this.url + 'hwa/' + race + '/' + gender, { headers: { 'Content-type': 'application/json' } });
    if (response.ok)
      return await response.json();
    else
      console.error(response);
  };

  getHPGP = async (className) => {
    const response = await fetch(this.url + 'hpgp/' + className, { headers: { 'Content-type': 'application/json' } });
    if (response.ok)
      return await response.json();
    else
      console.error(response);
  };

  getFinalAttributes = async (race, className) => {
    const response = await fetch(this.url + 'final/' + race + '/' + className, { headers: { 'Content-type': 'application/json' } });
    if (response.ok)
      return await response.json();
    else
      console.error(response);
  };
}
