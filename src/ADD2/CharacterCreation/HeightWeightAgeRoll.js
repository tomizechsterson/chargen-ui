export default class HeightWeightAgeRoll {
  constructor(race, gender, baseHeight, baseWeight, baseAge, heightMod, weightMod, ageMod) {
    this.race = race;
    this.gender = gender;
    this.baseHeight = baseHeight;
    this.baseWeight = baseWeight;
    this.baseAge = baseAge;
    this.heightMod = heightMod;
    this.weightMod = weightMod;
    this.ageMod = ageMod;
  }

  rollHeight = () => {
    return parseInt(this.heightMod.roll()[0].reduce((a, b) => parseInt(a) + parseInt(b))) + this.baseHeight;
  };

  rollWeight = () => {
    return parseInt(this.weightMod.roll()[0].reduce((a, b) => parseInt(a) + parseInt(b))) + this.baseWeight;
  };

  rollAge = () => {
    return parseInt(this.ageMod.roll()[0].reduce((a, b) => parseInt(a) + parseInt(b))) + this.baseAge;
  };
};
