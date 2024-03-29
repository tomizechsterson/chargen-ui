import Roller from "../DieRolling/Roller";
import AvailableRaces from "../ADD2/CharacterCreation/AvailableRaces";
import RacialStatAdjust from "../ADD2/CharacterCreation/RacialStatAdjust";
import AvailableClasses from "../ADD2/CharacterCreation/AvailableClasses";
import AllowedAlignments from "../ADD2/CharacterCreation/AllowedAlignments";
import HeightWeightAge from "../ADD2/CharacterCreation/HeightWeightAge";
import HP from "../ADD2/CharacterCreation/HP";
import Funds from "../ADD2/CharacterCreation/Funds";
import MovementRate from "../ADD2/CharacterCreation/MovementRate";
import SavingThrows from "../ADD2/CharacterCreation/SavingThrows";

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
    return new RacialStatAdjust(selectedRace).adjustments();
  };

  getClasses = async (character) => {
    return new AvailableClasses(
      character.race,
      character.str,
      character.dex,
      character.con,
      character.int,
      character.wis,
      character.chr
    ).select();
  };

  getAlignments = async (className) => {
    return new AllowedAlignments(className).get();
  };

  getHWA = async (race, gender) => {
    return new HeightWeightAge(race, gender).roll();
  };

  getHPGP = async (className) => {
    return [new HP(className).roll(), new Funds(className).get()];
  };

  getFinalAttributes = async (race, className) => {
    return [new MovementRate(race).get(), ...new SavingThrows(className).get()];
  };
}
