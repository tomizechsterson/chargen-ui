export default function assertRollRange (
  rolls,
  numRollsExpected,
  numDicePerRollExpected,
  lowBoundForRoll,
  highBoundForRoll
) {
  expect(rolls.length).toBe(numRollsExpected);
  rolls.forEach(roll => expect(roll.length).toBe(numDicePerRollExpected));
  rolls.forEach(roll => {
    const total = roll.reduce((a, b) => a + b, 0);
    expect(total).toBeGreaterThanOrEqual(lowBoundForRoll);
    expect(total).toBeLessThanOrEqual(highBoundForRoll);
  });
}
