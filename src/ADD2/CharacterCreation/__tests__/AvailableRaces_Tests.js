import AvailableRaces from '../AvailableRaces';

describe('Available Races', () => {
  it('Allows Human for the most unlucky person ever', () => {
    const results = new AvailableRaces({ str: 3, dex: 3, con: 3, int: 3, wis: 3, chr: 3 }).select();

    expect(results).toStrictEqual(['Human']);
  });

  it('Returns expected combinations of races', () => {
    const results = new AvailableRaces({ str: 8, dex: 5, con: 11, int: 3, wis: 3, chr: 8 }).select();

    expect(results).toStrictEqual(['Dwarf', 'Human']);
  });
});
