import AvailableRace from '../AvailableRace';

describe('Available Race', () => {
  it('Correctly returns availability', () => {
    const testRace = new AvailableRace(
      'Test',
      1, 10,
      1, 10,
      1, 10,
      1, 10,
      1, 10,
      1, 10
    );

    expect(testRace.isAvailable(1, 1, 1, 1, 1, 1)).toBeTruthy();
    expect(testRace.isAvailable(1, 1, 1, 1, 1, 0)).toBeFalsy();
    expect(testRace.isAvailable(1, 0, 0, 0, 0, 0)).toBeFalsy();
    expect(testRace.isAvailable(0, 0, 0, 0, 0, 0)).toBeFalsy();
  });
});
