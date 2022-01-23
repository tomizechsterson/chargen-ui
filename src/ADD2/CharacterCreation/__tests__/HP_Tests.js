import HP from '../HP';

describe('Starting HP', () => {
  it('returns values in expected ranges for warrior classes', () => {
    let result = new HP('Fighter').roll();

    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);

    result = new HP('Ranger').roll();

    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);

    result = new HP('Paladin').roll();

    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);
  });

  it('returns values in expected ranges for priest classes', () => {
    let result = new HP('Cleric').roll();

    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(8);

    result = new HP('Druid').roll();

    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(8);
  });

  it('returns values in expected ranges for rogue classes', () => {
    let result = new HP('Thief').roll();

    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(6);

    result = new HP('Bard').roll();

    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(6);
  });

  it('returns values in expected ranges for mage', () => {
    const result = new HP('Mage').roll();

    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(4);
  });

  it('returns average starting hp for multiclass', () => {
    const result = new HP('Fighter/Mage').roll();

    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(7);
  });
});
