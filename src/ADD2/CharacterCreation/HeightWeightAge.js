import HeightWeightAgeRoll from "./HeightWeightAgeRoll";
import Roller from "../../DieRolling/Roller";

export default class HeightWeightAge {
  constructor(race, gender) {
    this.race = race.toLowerCase();
    this.gender = gender.toLowerCase();
    this.heightWeightAgeRolls = [
      new HeightWeightAgeRoll('dwarf', 'm', 43, 130, 40, new Roller('1d10', 1), new Roller('4d10', 1), new Roller('5d6', 1)),
      new HeightWeightAgeRoll('dwarf', 'f', 41, 105, 40, new Roller('1d10', 1), new Roller('4d10', 1), new Roller('5d6', 1)),
      new HeightWeightAgeRoll('elf', 'm', 55, 90, 100, new Roller('1d10', 1), new Roller('3d10', 1), new Roller('5d6', 1)),
      new HeightWeightAgeRoll('elf', 'f', 50, 70, 100, new Roller('1d10', 1), new Roller('3d10', 1), new Roller('5d6', 1)),
      new HeightWeightAgeRoll('gnome', 'm', 38, 72, 60, new Roller('1d6', 1), new Roller('5d4', 1), new Roller('3d12', 1)),
      new HeightWeightAgeRoll('gnome', 'f', 36, 68, 60, new Roller('1d6', 1), new Roller('5d4', 1), new Roller('3d12', 1)),
      new HeightWeightAgeRoll('half-elf', 'm', 60, 110, 15, new Roller('2d6', 1), new Roller('3d12', 1), new Roller('1d6', 1)),
      new HeightWeightAgeRoll('half-elf', 'f', 58, 85, 15, new Roller('2d6', 1), new Roller('3d12', 1), new Roller('1d6', 1)),
      new HeightWeightAgeRoll('halfling', 'm', 32, 52, 20, new Roller('2d8', 1), new Roller('5d4', 1), new Roller('3d4', 1)),
      new HeightWeightAgeRoll('halfling', 'f', 30, 48, 20, new Roller('2d8', 1), new Roller('5d4', 1), new Roller('3d4', 1)),
      new HeightWeightAgeRoll('human', 'm', 60, 140, 15, new Roller('2d10', 1), new Roller('6d10', 1), new Roller('1d4', 1)),
      new HeightWeightAgeRoll('human', 'f', 59, 100, 15, new Roller('2d10', 1), new Roller('6d10', 1), new Roller('1d4', 1))
    ];
  }

  height = () => {
    return this.heightWeightAgeRolls.find(r => r.race === this.race && r.gender === this.gender).rollHeight();
  };

  weight = () => {
    return this.heightWeightAgeRolls.find(r => r.race === this.race && r.gender === this.gender).rollWeight();
  };

  age = () => {
    return this.heightWeightAgeRolls.find(r => r.race === this.race && r.gender === this.gender).rollAge();
  };
};
