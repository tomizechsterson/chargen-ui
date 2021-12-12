import LocalGatewayADD2 from "../LocalGatewayADD2";

describe('LocalGatewayDD35 Tests', () => {
  const gateway = new LocalGatewayADD2();

  it('can create and delete characters on localStorage', async () => {
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
  });
});
