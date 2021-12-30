import LocalGatewayADD2 from "../LocalGatewayADD2";
import assertRollRange from "../../DieRolling/TestUtils";

describe('LocalGatewayDD35 Tests', () => {
  const gateway = new LocalGatewayADD2();

  it('can create, update, and delete characters on localStorage', async () => {
    let testChars = await gateway.getCharacters();
    expect(testChars).toHaveLength(0);

    await gateway.createCharacter({ name: 'localCreateTest', id: 1 });
    testChars = await gateway.getCharacters();

    expect(testChars).toHaveLength(1);
    expect(testChars[0].name).toBe('localCreateTest');
    expect(testChars[0].id).toBe(1);

    await gateway.createCharacter({ name: 'secondLocal', id: 2 });

    testChars = await gateway.getCharacters();

    expect(testChars).toHaveLength(2);
    expect(testChars[1].name).toEqual('secondLocal');
    expect(testChars[1].id).toEqual(2);

    await gateway.deleteCharacter(1);

    testChars = await gateway.getCharacters();

    expect(testChars).toHaveLength(1);
    expect(testChars[0].name).toEqual('secondLocal');
    expect(testChars[0].id).toEqual(2);

    testChars[0].name = 'updatedSecondLocal';
    await gateway.updateCharacter(testChars[0]);

    testChars = await gateway.getCharacters();

    expect(testChars[0].name).toEqual('updatedSecondLocal');
  });

  describe('rolling stats returns sensible results',() => {
    it('handles Roll Once', async () => {
      const stats = await gateway.rollStats('rollstats/rollonce');

      assertRollRange(
        stats,
        6,
        3,
        3,
        18
      );
    });

    it('handles Roll Twice', async () => {
      const stats = await gateway.rollStats('rollstats/rolltwice');

      assertRollRange(
        stats,
        12,
        3,
        3,
        18
      );
    });

    it('handles Stat Assignment', async () => {
      const stats = await gateway.rollStats('rollstats/assignment');

      assertRollRange(
        stats,
        6,
        3,
        3,
        18
      );
    });

    it('handles Double Stat Assignment', async () => {
      const stats = await gateway.rollStats('rollstats/assignmentDouble');

      assertRollRange(
        stats,
        12,
        3,
        3,
        18
      );
    });

    it('handles Roll Four', async () => {
      const stats = await gateway.rollStats('rollstats/rollfour');

      assertRollRange(
        stats,
        6,
        4,
        4,
        24
      );
    });

    it('handles Add 7 Dice', async () => {
      const stats = await gateway.rollStats('rollstats/AddSevenDice');

      assertRollRange(
        stats,
        7,
        1,
        1,
        6
      );
    });

    it('throws an error with invalid stat roll rule', async () => {
      expect.assertions(1);
      try {
        await gateway.rollStats('INVALID');
      } catch(e) {
        expect(e).toMatch('Invalid roll rule: INVALID');
      }
    });
  });
});
