import Roller from "../DieRolling/Roller";
import AvailableRaces from "../ADD2/CharacterCreation/AvailableRaces";

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
    if(rollRule === 'rollstats/rollonce') {
      return new Roller('3d6', 6).roll();
    }
    else if(rollRule === 'rollstats/rolltwice') {
      return new Roller('3d6', 12).roll();
    }
    else if(rollRule === 'rollstats/assignment') {
      return new Roller('3d6', 6).roll();
    }
    else if(rollRule === 'rollstats/assignmentDouble') {
      return new Roller('3d6', 12).roll();
    }
    else if(rollRule === 'rollstats/rollfour') {
      return new Roller('4d6', 6).roll();
    }
    else if(rollRule === 'rollstats/AddSevenDice') {
      return new Roller('1d6', 7).roll();
    }
    else
      throw `Invalid roll rule: ${rollRule}`;
  };

  getRaces = async (character) => {
    return new AvailableRaces(character).select();
  };

  getAdjustments = async (selectedRace) => {
    throw `getAdjustments with ${selectedRace} not implemented yet!`;
  };

  getClasses = async (character) => {
    console.log('CHARACTER: ', character);
    throw 'getClasses not implemented yet!';
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
