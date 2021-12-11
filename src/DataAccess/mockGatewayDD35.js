export default class MockGatewayDD35 {
  constructor() {
    this.data = [];
  }

  get = async () => {
    return this.data;
  };

  createCharacter = async (character) => {
    this.data.push(character);
  };

  deleteCharacter = async (id) => {
    const list = [...this.data];
    this.data = list.filter(item => item.id !== id);
  };
}
