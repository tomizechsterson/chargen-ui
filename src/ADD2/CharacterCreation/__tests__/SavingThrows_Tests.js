import SavingThrows from "../SavingThrows";

describe('Saving Throws', () => {
  it('returns saving throws for single class', () => {
    const result = new SavingThrows('Fighter').get();

    expect(result).toStrictEqual([14, 16, 15, 17, 17]);
  });

  it('returns saving throws for multiclass Mage', () => {
    const result = new SavingThrows('Fighter/Mage').get();

    expect(result).toStrictEqual([14, 11, 13, 15, 12]);
  });

  it('returns saving throws for multiclass Cleric', () => {
    const result = new SavingThrows('Fighter/Cleric').get();

    expect(result).toStrictEqual([10, 14, 13, 16, 15]);
  });

  it('returns saving throws for multiclass Druid', () => {
    const result = new SavingThrows('Fighter/Druid').get();

    expect(result).toStrictEqual([10, 14, 13, 16, 15]);
  });

  it('returns saving throws for multiclass Thief', () => {
    const result = new SavingThrows('Fighter/Thief').get();

    expect(result).toStrictEqual([13, 14, 12, 16, 15]);
  });
});
