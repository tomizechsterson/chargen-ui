export default class SavingThrows {
  constructor(className) {
    this.className = className;
    this.savingThrows = {
      'Fighter': [14, 16, 15, 17, 17],
      'Ranger': [14, 16, 15, 17, 17],
      'Paladin': [14, 16, 15, 17, 17],
      'Cleric': [10, 14, 13, 16, 15],
      'Druid': [10, 14, 13, 16, 15],
      'Thief': [13, 14, 12, 16, 15],
      'Bard': [13, 14, 12, 16, 15],
      'Mage': [14, 11, 13, 15, 12]
    };
  }

  savingThrowsForMulticlass = () => {
    if(this.className.split('/').includes('Mage'))
      return this.savingThrows['Mage'];
    if(this.className.split('/').includes('Cleric'))
      return this.savingThrows['Cleric'];
    if(this.className.split('/').includes('Druid'))
      return this.savingThrows['Druid'];

    return this.className.split('/').includes('Thief')
      ? this.savingThrows['Thief']
      : this.savingThrows['Fighter'];
  };

  get = () => {
    return this.className.includes('/')
      ? this.savingThrowsForMulticlass()
      : this.savingThrows[this.className];
  };
};
