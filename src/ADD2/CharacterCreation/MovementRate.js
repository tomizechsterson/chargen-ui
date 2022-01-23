export default class MovementRate {
  constructor(race) {
    this.race = race;
    this.movementRates = {
      'Dwarf': 6,
      'Elf': 12,
      'Gnome': 6,
      'Half-Elf': 12,
      'Halfling': 6,
      'Human': 12
    };
  }

  get = () => {
    return this.movementRates[this.race];
  };
};
