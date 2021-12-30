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
    throw `rollStats with ${rollRule} not implemented yet!`;
  };

  getRaces = async (character) => {
    throw `getRaces with ${character.toString()} not implemented yet!`;
  };

  getAdjustments = async (selectedRace) => {
    throw `getAdjustments with ${selectedRace} not implemented yet!`;
  };

  getClasses = async (character) => {
    throw `getClasses with ${character} not implemented yet!`;
  };

  getAlignments = async (className) => {
    throw `getAlignments with ${className} not implemented yet!`;
  };

  getHWA = async (race, gender) => {
    throw `getHWA with ${gender} ${race} not implemented yet!`;
  };

  getHPGP = async (className) => {
    throw `getHPGP with ${className} not implemented yet!`;
  };

  getFinalAttributes = async (race, className) => {
    throw `getFinalAttributes with ${race} ${className} not implemented yet!`;
  };
}
