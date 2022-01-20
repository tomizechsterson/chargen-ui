export default class AllowedAlignments {
  constructor(className) {
    this.className = className;
    this.allowedAlignments = {
      'Paladin': ['Lawful Good'],
      'Druid': ['True Neutral'],
      'Ranger': ['Lawful Good', 'Neutral Good', 'Chaotic Good'],
      'Bard': ['Lawful Neutral', 'Neutral Good', 'True Neutral', 'Neutral Evil', 'Chaotic Neutral'],
      'Fighter': this.allAlignments(),
      'Mage': this.allAlignments(),
      'Cleric': this.allAlignments(),
      'Thief': this.allAlignments()
    };
  }

  allAlignments = () => {
    return [
      'Lawful Good', 'Neutral Good', 'Chaotic Good',
      'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
      'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'
    ];
  };

  get = () => {
    return this.className.includes('/') ? this.allAlignments() : this.allowedAlignments[this.className];
  };
};
