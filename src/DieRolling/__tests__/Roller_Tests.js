import Roller from "../Roller";
import assertRollRange from "../TestUtils";

describe('Roller', () => {
  it('rolls one die one time', () => {
    const rolls = new Roller('1d6', 1).roll();

    assertRollRange(
      rolls,
      1,
      1,
      1,
      6
    );
  });

  it('rolls multiple dice one time', () => {
    const rolls = new Roller('2d6', 1).roll();

    assertRollRange(
      rolls,
      1,
      2,
      2,
      12
    );
  });

  it('rolls multiple dice multiple times', () => {
    const rolls = new Roller('4d6', 3).roll();

    assertRollRange(
      rolls,
      3,
      4,
      4,
      24
    );
  });
});
