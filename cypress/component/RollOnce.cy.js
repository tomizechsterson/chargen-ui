import { mount } from 'cypress/react';
import RollOnce from "../../src/StatRollRules/RollOnce";

describe('<RollOnce />', () => {
  it('mounts', () => {
    mount(<RollOnce />);
  })
})
