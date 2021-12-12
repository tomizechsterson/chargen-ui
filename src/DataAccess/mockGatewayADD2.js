export default class MockGatewayADD2 {
  constructor() {
    this.data = [];
  }

  getCharacters = async () => {
    return this.data;
  };

  createCharacter = async (character) => {
    this.data.push(character);
  };

  updateCharacter = async (character) => {
    const list = [...this.data];
    const index = list.findIndex(function(o) {
      return o.id === character.id;
    });
    list[index] = character;
    this.data = list;
  };

  deleteCharacter = async (id) => {
    const list = [...this.data];
    this.data = list.filter(item => item.id !== id);
  };

  rollStats = async (rollRule) => {
    if(rollRule === 'rollstats/rollonce')
      return [[1, 1, 1], [1, 1, 2], [1, 2, 2], [2, 2, 2], [2, 2, 3], [2, 3, 3]];
    else if(rollRule === 'rollstats/rolltwice')
      return [[1, 1, 1], [1, 1, 2], [1, 2, 2], [2, 2, 2], [2, 2, 3], [2, 3, 3],
        [3, 3, 3], [3, 3, 4], [3, 4, 4], [4, 4, 4], [4, 4, 5], [4, 5, 5]];
    else if(rollRule === 'rollstats/assignment')
      return [[1, 1, 1], [1, 1, 2], [1, 2, 2], [2, 2, 2], [2, 2, 3], [2, 3, 3]];
    else if(rollRule === 'rollstats/assignmentDouble')
      return [[1, 1, 1], [1, 1, 2], [1, 2, 2], [2, 2, 2], [2, 2, 3], [2, 3, 3],
        [3, 3, 3], [3, 3, 4], [3, 4, 4], [4, 4, 4], [4, 4, 5], [4, 5, 5]];
    else if(rollRule === 'rollstats/rollfour')
      return [[1, 1, 1, 1], [1, 1, 1, 2], [1, 1, 1, 3], [1, 1, 1, 4], [1, 1, 1, 5], [1, 1, 1, 6]];
    else if(rollRule === 'rollstats/AddSevenDice')
      return [[1], [2], [3], [4], [5], [6], [1]];
    else
      throw 'Invalid stat roll rule';
  };

  getRaces = async (character) => {
    throw 'Not implemented yet!';
  };

  getAdjustments = async (selectedRace) => {
    return { 'str': 99, 'dex': -99 };
  };

  getClasses = async (character) => {
    throw 'Not implemented yet!';
  };

  getAlignments = async (className) => {
    throw 'Not implemented yet!';
  };

  getHWA = async (race, gender) => {
    return [99, 999, 99];
  };

  getHPGP = async (className) => {
    return [99, 9999];
  };

  getFinalAttributes = async (race, className) => {
    return [99, 99, 99, 99, 99, 99];
  };
}
