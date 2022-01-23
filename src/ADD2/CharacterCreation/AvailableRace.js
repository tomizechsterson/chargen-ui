export default class AvailableRace {
  constructor(
    name,
    minStr, maxStr,
    minDex, maxDex,
    minCon, maxCon,
    minInt, maxInt,
    minWis, maxWis,
    minChr, maxChr
  ) {
    this.name = name;
    this.minStr = minStr;
    this.maxStr = maxStr;
    this.minDex = minDex;
    this.maxDex = maxDex;
    this.minCon = minCon;
    this.maxCon = maxCon;
    this.minInt = minInt;
    this.maxInt = maxInt;
    this.minWis = minWis;
    this.maxWis = maxWis;
    this.minChr = minChr;
    this.maxChr = maxChr;
  }

  name = () => {
    return this.name;
  };

  isAvailable = (str, dex, con, int, wis, chr) => {
    return str >= this.minStr && str <= this.maxStr &&
      dex >= this.minDex && dex <= this.maxDex &&
      con >= this.minCon && con <= this.maxCon &&
      int >= this.minInt && int <= this.maxInt &&
      wis >= this.minWis && wis <= this.maxWis &&
      chr >= this.minChr && chr <= this.maxChr;
  };
};
