import AvailableRace from "./AvailableRace";

export default class AvailableRaces {
  constructor(character) {
    this.character = character;
    this.racesAvailable = [
      new AvailableRace('Dwarf', 8, 18, 3, 17, 11, 18, 3, 18, 3, 18, 3, 17),
      new AvailableRace('Elf', 3, 18, 6, 18, 7, 18, 8, 18, 3, 18, 8, 18),
      new AvailableRace('Gnome', 6, 18, 3, 18, 8, 18, 6, 18, 3, 18, 3, 18),
      new AvailableRace('Half-Elf', 3, 18, 6, 18, 6, 18, 4, 18, 3, 18, 3, 18),
      new AvailableRace('Halfling', 7, 18, 7, 18, 10, 18, 6, 18, 3, 17, 3, 18),
      new AvailableRace('Human', 3, 18, 3, 18, 3, 18, 3, 18, 3, 18, 3, 18)
    ];
  }

  select = () => {
    const c = this.character;
    return this.racesAvailable.filter(r => r.isAvailable(c.str, c.dex, c.con, c.int, c.wis, c.chr)).map(r => r.name);
  };
};
