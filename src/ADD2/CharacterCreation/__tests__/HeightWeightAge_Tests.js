import HeightWeightAge from "../HeightWeightAge";

describe('Height/Weight/Age', () => {
  let heightWeightAge;

  beforeAll(() => {
    heightWeightAge = new HeightWeightAge('dwarf', 'f');
  });

  it('Returns height within expected range', () => {
    const height = heightWeightAge.height();

    expect(height).toBeGreaterThanOrEqual(42);
    expect(height).toBeLessThanOrEqual(51);
  });

  it('Returns weight within expected range', () => {
    const weight = heightWeightAge.weight();

    expect(weight).toBeGreaterThanOrEqual(109);
    expect(weight).toBeLessThanOrEqual(145);
  });

  it('Returns age within expected range', () => {
    const age = heightWeightAge.age();

    expect(age).toBeGreaterThanOrEqual(45);
    expect(age).toBeLessThanOrEqual(70);
  });

  it('returns the expected roll', () => {
    const roll = heightWeightAge.roll();

    expect(roll[0]).toBeGreaterThanOrEqual(42);
    expect(roll[0]).toBeLessThanOrEqual(51);
    expect(roll[1]).toBeGreaterThanOrEqual(109);
    expect(roll[1]).toBeLessThanOrEqual(145);
    expect(roll[2]).toBeGreaterThanOrEqual(45);
    expect(roll[2]).toBeLessThanOrEqual(70);
  });
});
