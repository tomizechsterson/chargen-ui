import AvailableClass from '../AvailableClass';

describe('Available Class', () => {
  it('Correctly returns availability', () => {
    const testClass = new AvailableClass(
      'Test',
      1, 1, 1, 1, 1, 1,
      ['Human', 'Elf']
    );

    expect(testClass.isAvailable('Human', 1, 1, 1, 1, 1, 1)).toBeTruthy();
    expect(testClass.isAvailable('Gnome', 1, 1, 1, 1, 1, 1)).toBeFalsy();
    expect(testClass.isAvailable('Human', 1, 1, 1, 1, 1, 0)).toBeFalsy();
    expect(testClass.isAvailable('Human', 0, 0, 0, 0, 0, 0)).toBeFalsy();
  });
});
