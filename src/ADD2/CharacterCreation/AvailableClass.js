export default class AvailableClass {
  constructor(name, minStr, minDex, minCon, minInt, minWis, minChr, allowableRaces) {
    this.name = name;
    this.minStr = minStr;
    this.minDex = minDex;
    this.minCon = minCon;
    this.minInt = minInt;
    this.minWis = minWis;
    this.minChr = minChr;
    this.allowableRaces = allowableRaces;
  }

  isAvailable = (race, str, dex, con, int, wis, chr) => {
    return this.allowableRaces.includes(race) &&
      str >= this.minStr &&
      dex >= this.minDex &&
      con >= this.minCon &&
      int >= this.minInt &&
      wis >= this.minWis &&
      chr >= this.minChr;
  };
};
