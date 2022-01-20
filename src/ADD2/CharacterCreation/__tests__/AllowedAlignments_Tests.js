import AllowedAlignments from '../AllowedAlignments';

describe('Allowed Alignments', () => {
  it('Returns expected alignments for single class', () => {
    let alignments = new AllowedAlignments('Paladin').get();

    expect(alignments).toStrictEqual(['Lawful Good']);

    alignments = new AllowedAlignments('Ranger').get();

    expect(alignments).toStrictEqual(['Lawful Good', 'Neutral Good', 'Chaotic Good']);
  });

  it('Returns expected alignments for multi-class', () => {
    const alignments = new AllowedAlignments('Druid/Mage').get();

    expect(alignments).toStrictEqual([
      'Lawful Good', 'Neutral Good', 'Chaotic Good',
      'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
      'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'
    ]);
  });
});
