import Roller from "../../DieRolling/Roller";

export default class Funds {
  constructor(className) {
    this.className = className;
    this.initialFundRolls = {
      'Fighter': new Roller('5d4', 1),
      'Ranger': new Roller('5d4', 1),
      'Paladin': new Roller('5d4', 1),
      'Mage': new Roller('1d4', 1),
      'Thief': new Roller('2d6', 1),
      'Bard': new Roller('2d6', 1),
      'Cleric': new Roller('3d6', 1),
      'Druid': new Roller('3d6', 1)
    };
  }

  initialFundsForMulticlass = () => {
    if(this.className.split('/').includes('Fighter'))
      return this.initialFundRolls['Fighter'].roll()[0].reduce((a, b) => parseInt(a) + parseInt(b)) * 10;
    if(this.className.split('/').includes('Ranger'))
      return this.initialFundRolls['Ranger'].roll()[0].reduce((a, b) => parseInt(a) + parseInt(b)) * 10;
    if(this.className.split('/').includes('Cleric'))
      return this.initialFundRolls['Cleric'].roll()[0].reduce((a, b) => parseInt(a) + parseInt(b)) * 10;
    if(this.className.split('/').includes('Druid'))
      return this.initialFundRolls['Druid'].roll()[0].reduce((a, b) => parseInt(a) + parseInt(b)) * 10;

    return this.initialFundRolls['Thief'].roll()[0].reduce((a, b) => parseInt(a) + parseInt(b)) * 10;
  };

  get = () => {
    if(this.className.includes('/')) {
      return this.initialFundsForMulticlass();
    }

    if(this.className === 'Mage')
      return this.initialFundRolls[this.className].roll()[0].reduce((a, b) => parseInt(a) + parseInt(b), 1) * 10;

    return this.initialFundRolls[this.className].roll()[0].reduce((a, b) => parseInt(a) + parseInt(b)) * 10;
  };
};
