import Roller from "../../DieRolling/Roller";

export default class HP {
  constructor(className) {
    this.className = className;
    this.hpRolls = {
      'Fighter': new Roller('1d10', 1),
      'Ranger': new Roller('1d10', 1),
      'Paladin': new Roller('1d10', 1),
      'Cleric': new Roller('1d8', 1),
      'Druid': new Roller('1d8', 1),
      'Thief': new Roller('1d6', 1),
      'Bard': new Roller('1d6', 1),
      'Mage': new Roller('1d4', 1)
    };
  }

  roll = () => {
    let result = 0;
    if(this.className.includes('/')) {
      const classes = this.className.split('/');
      classes.forEach(c => result += this.hpRolls[c].roll()[0][0]);
      return result / classes.length;
    }
    else
      return this.hpRolls[this.className].roll()[0][0];
  };
};
