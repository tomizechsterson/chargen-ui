export default class LocalGatewayDD35 {
  constructor() {
    this.storageKey = 'localCharacters.DD35';
  }

  get = async () => {
    if(!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, '[]');
      return JSON.parse('[]');
    }
    else
      return JSON.parse(localStorage.getItem(this.storageKey));
  };

  createCharacter = async (character) => {
    const chars = JSON.parse(localStorage.getItem(this.storageKey));
    chars.push(character);
    localStorage.setItem(this.storageKey, JSON.stringify(chars));
  };

  deleteCharacter = async (id) => {
    const list = [...JSON.parse(localStorage.getItem(this.storageKey))];
    const updatedList = list.filter(item => item.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(updatedList));
  };
}
