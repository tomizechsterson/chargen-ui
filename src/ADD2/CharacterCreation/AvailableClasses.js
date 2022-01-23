import AvailableClass from "./AvailableClass";

export default class AvailableClasses {
  constructor(race, str, dex, con, int, wis, chr) {
    this.race = race;
    this.str = str;
    this.dex = dex;
    this.con = con;
    this.int = int;
    this.wis = wis;
    this.chr = chr;
    this.classesAvailable = [
      new AvailableClass('Fighter', 9, 3, 3, 3, 3, 3, this.allRaces()),
      new AvailableClass('Paladin', 12, 3, 9, 3, 13, 17, [ 'Human' ]),
      new AvailableClass('Ranger', 13, 13, 14, 3, 14, 3, [ 'Elf', 'Half-Elf', 'Human' ]),
      new AvailableClass('Mage', 3, 3, 3, 9, 3, 3, [ 'Elf', 'Half-Elf', 'Human' ]),
      new AvailableClass('Cleric', 3, 3, 3, 3, 9, 3, this.allRaces()),
      new AvailableClass('Druid', 3, 3, 3, 3, 12, 15, [ 'Half-Elf', 'Human' ]),
      new AvailableClass('Thief', 3, 9, 3, 3, 3, 3, this.allRaces()),
      new AvailableClass('Bard', 3, 12, 3, 13, 3, 15, [ 'Half-Elf', 'Human' ])
    ];
    this.multiClassesAvailable = {
      'Dwarf': ['Fighter/Cleric', 'Fighter/Thief'],
      'Elf': ['Fighter/Mage', 'Fighter/Thief', 'Mage/Thief', 'Fighter/Mage/Thief'],
      'Gnome': ['Fighter/Cleric', 'Fighter/Thief', 'Cleric/Thief'],
      'Half-Elf': ['Fighter/Cleric', 'Fighter/Thief', 'Fighter/Druid', 'Fighter/Mage',
        'Cleric/Ranger', 'Druid/Ranger', 'Cleric/Mage', 'Druid/Mage', 'Thief/Mage', 'Fighter/Mage/Cleric',
        'Fighter/Mage/Druid', 'Fighter/Mage/Thief'],
      'Halfling': ['Fighter/Thief'],
      'Human': []
    };
  }

  allRaces = () => {
    return ['Dwarf', 'Elf', 'Gnome', 'Half-Elf', 'Halfling', 'Human'];
  };

  select = () => {
    const results = this.classesAvailable.filter(c => c.isAvailable(this.race, this.str, this.dex, this.con, this.int, this.wis, this.chr)).map(c => c.name);

    this.multiClassesAvailable[this.race].forEach(mc => {
      const classes = mc.split('/');
      if(classes.every(c => results.includes(c)))
        results.push(mc);
    });

    return results;
  };
};
