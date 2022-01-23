import RacialStatAdjust from '../RacialStatAdjust.js';

describe('Racial Stat Adjustments', () => {
  it('returns expected adjustments', () => {
    const adjustments = new RacialStatAdjust('Dwarf').adjustments();

    expect(adjustments).toStrictEqual({ 'con': 1, 'chr': -1 });
  });

  it('returns expected blank adjustments', () => {
    const adjustments = new RacialStatAdjust('Human').adjustments();

    expect(adjustments).toStrictEqual({});
  });
});
