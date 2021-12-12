export default class LocalGatewayADD2 {
  constructor() {
    this.storageKey = 'localCharacters.ADD2';
  }

  getCharacters = async () => {
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

  updateCharacter = async (character) => {
    const list = [...JSON.parse(localStorage.getItem(this.storageKey))];
    const index = list.findIndex(function(o) {
      return o.id === character.id;
    });
    list[index] = character;
    localStorage.setItem(this.storageKey, JSON.stringify(list));
  };

  deleteCharacter = async (id) => {
    const list = [...JSON.parse(localStorage.getItem(this.storageKey))];
    const updatedList = list.filter(item => item.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(updatedList));
  };

  rollStats = async (rollRule) => {
    throw 'Not implemented yet!';
  };

  getRaces = async (character) => {
    throw 'Not implemented yet!';
  };

  getAdjustments = async (selectedRace) => {
    throw 'Not implemented yet!';
  };

  getClasses = async (character) => {
    throw 'Not implemented yet!';
  };

  getAlignments = async (className) => {
    throw 'Not implemented yet!';
  };

  getHWA = async (race, gender) => {
    throw 'Not implemented yet!';
  };

  getHPGP = async (className) => {
    throw 'Not implemented yet!';
  };

  getFinalAttributes = async (race, className) => {
    throw 'Not implemented yet!';
  };
}
