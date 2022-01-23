export default class RacialStatAdjust {
  constructor(race) {
    this.race = race;
    this.racialStatAdjustments = {
      'dwarf': { 'con': 1, 'chr': -1 },
      'elf': { 'dex': 1, 'con': -1 },
      'gnome': { 'int': 1, 'wis': -1 },
      'half-elf': {},
      'halfling': { 'dex': 1, 'str': -1 },
      'human': {}
    };
  }

  adjustments = () => {
    return this.racialStatAdjustments[this.race.toLowerCase()];
  };
};
