export default class Roller {
  constructor(dieRoll, times) {
    this.dieRoll = dieRoll; // e.g. '2d6' -> roll 2 six-sided dice
    this.times = times;
  }

  roll = () => {
    const parseRoll = (roll) => {
      const rollParts = roll.split('d');
      return [rollParts[1], rollParts[0]];
    };

    const doRoll = (min, max) => {
      return Math.floor(Math.random() * (max - min)) + min;
    };

    let result = [];
    for(let i = 0; i < this.times; i ++) {
      let die, times;
      [die, times] = parseRoll(this.dieRoll);

      let rolls = [];
      for(let j = 0; j < times; j++) {
        rolls.push(doRoll(1, parseInt(die) + 1));
      }

      result.push(rolls);
    }

    return result;
  };
}
