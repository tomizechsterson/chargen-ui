import AvailableClasses from '../AvailableClasses';

describe('Available Classes', () => {
  it('Returns expected classes based on stats for human', () => {
    let results = new AvailableClasses('Human', 9, 3, 3, 3, 3, 3).select();

    expect(results).toStrictEqual(['Fighter']);

    results = new AvailableClasses('Human', 3, 3, 3, 9, 3, 3).select();

    expect(results).toStrictEqual(['Mage']);
  });

  it('Returns expected multi-classes', () => {
    let results = new AvailableClasses('Dwarf', 13, 13, 14, 13, 14, 17).select();

    expect(results).toStrictEqual([ 'Fighter', 'Cleric', 'Thief', 'Fighter/Cleric', 'Fighter/Thief' ])
  });
});
