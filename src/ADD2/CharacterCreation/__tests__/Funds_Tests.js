import Funds from "../Funds";

describe('Funds', () => {
  it('returns expected starting GP', () => {
    const result = new Funds('Fighter').get();

    expect(result).toBeGreaterThanOrEqual(50);
    expect(result).toBeLessThanOrEqual(200);
  });

  it('returns expected starting GP range for Mage', () => {
    const result = new Funds('Mage').get();

    expect(result).toBeGreaterThanOrEqual(20);
    expect(result).toBeLessThanOrEqual(50);
  });

  it('returns expected starting GP for multiclass', () => {
    const result = new Funds('Cleric/Thief').get();

    expect(result).toBeGreaterThanOrEqual(30);
    expect(result).toBeLessThanOrEqual(180);
  });
});
