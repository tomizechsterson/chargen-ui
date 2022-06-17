import React, { useState, useEffect } from 'react';
import ADD2CharacterTable from './ADD2CharacterTable';
import ADD2CharacterDetails from './ADD2CharacterDetails';

export default function ADD2Characters ({ serverGateway }) {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     characterData: [],
  //     selected: null,
  //     newCharName: ''
  //   };
  //   this.isUnmounted = false;
  //
  //   this.handleSelect = this.handleSelect.bind(this);
  //   this.handleDelete = this.handleDelete.bind(this);
  //   this.handleUpdate = this.handleUpdate.bind(this);
  // }

  const [characterData, setCharacterData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [newCharName, setNewCharName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await serverGateway.getCharacters();
      setCharacterData(data);
    }

    fetchData();
  }, [characterData]);

  // async componentDidMount() {
  //   const { serverGateway } = this.props;
  //   const data = await serverGateway.getCharacters();
  //   if (!this.isUnmounted)
  //     this.setState({ characterData: data });
  // }
  //
  // componentWillUnmount() {
  //   this.isUnmounted = true;
  // }

  function handleSelect(id) {
    // const { selected, characterData } = this.state;
    if (!selected) {
      for (let i = 0; i < characterData.length; i++) {
        if (characterData[i].id === id) {
          // this.setState({ selected: characterData[i] });
          setSelected(characterData[i]);
        }
      }
    } else {
      for (let i = 0; i < characterData.length; i++) {
        if (characterData[i].id === id && selected.id !== id) {
          // this.setState({ selected: characterData[i] });
          setSelected(characterData[i]);
        }
      }
    }
  }

  async function handleDelete(id) {
    // const { serverGateway } = this.props;
    // const { characterData } = this.state;
    const index = characterData.findIndex(function(o) {
      return o.id === id;
    });

    const charToDelete = characterData[index];

    if (window.confirm(`Are you sure you want to delete ${charToDelete.name}, the ${charToDelete.race} ${charToDelete.className}?`)) {
      characterData.splice(index, 1);

      // this.setState({ selected: null });
      setSelected(null);
      await serverGateway.deleteCharacter(id);
    }
  }

  async function handleUpdate(character) {
    // const { serverGateway } = this.props;

    if (character.completionStep === 2)
      character.availableRaces = await serverGateway.getRaces(character);

    if (character.completionStep === 3) {
      character.availableClasses = await serverGateway.getClasses(character);
    }

    if (character.completionStep === 4) {
      character.availableAlignments = await serverGateway.getAlignments(character.className);
    }

    const chars = characterData;
    const i = chars.findIndex(function(o) {
      return o.id === character.id
    });
    chars[i] = character;
    // this.setState({ characterData: chars });
    setCharacterData(chars);

    await serverGateway.updateCharacter(character);
  }

  async function handleCreate() {
    console.log('FUCK YOU!!!');
    console.log('newCharName: ', newCharName);
    // const { serverGateway } = this.props;
    // const { newCharName, characterData } = this.state;

    function newNameIsUnique(newCharName) {
      const index = characterData.findIndex(function(c) {
        return c.name === newCharName;
      });

      return index === -1;
    }

    if (newCharName.trim() && newNameIsUnique(newCharName)) {
      console.log('new name is unique');
      let newId;
      const characters = characterData;
      if (characters.length === 0)
        newId = 1;
      else
        newId = characters[characters.length - 1].id + 1;

      console.log('newId: ', newId);

      const newChar = {
        id: newId, name: newCharName,
        completionStep: 1,
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        wis: 0,
        chr: 0,
        race: 'none',
        gender: 'n',
        height: 0,
        weight: 0,
        age: 0,
        className: 'none',
        alignment: 'none',
        paralyze: 0,
        rod: 0,
        petrification: 0,
        breath: 0,
        spell: 0,
        hp: 0,
        moveRate: 0,
        funds: 0
      };
      const newCharList = characters.concat([newChar]);
      // this.setState({ characterData: newCharList, newCharName: '' });
      setCharacterData(newCharList);
      setNewCharName('');

      await serverGateway.createCharacter(newChar);
    } else {
      // this.setState({ newCharName: '' });
      setNewCharName('');
    }
  }

  function handleNewNameChange(e) {
    // this.setState({ newCharName: e.target.value });
    setNewCharName(e.target.value);
  }

  async function handleKeyPress(e) {
    if (e.key === 'Enter')
      await handleCreate();
    else
      setNewCharName(e.target.value)
  }

  //render() {
    // const { newCharName, characterData, selected } = this.state;
    // const { serverGateway } = this.props;
    const topLevelColumnsStyle = {
      columnCount: 2,
      columnRuleStyle: 'solid',
      columnFill: 'balance',
      breakAfter: 'column'
    };

    return (
      <div style={topLevelColumnsStyle}>
        <div>
          <button onClick={ () => handleCreate() }>Create</button>
          <input
            type='text'
            maxLength='32'
            placeholder='character name'
            // value={ newCharName }
            onChange={ (e) => handleNewNameChange(e) }
            onKeyUp={(e) => handleKeyPress(e) }
          />
          <ADD2CharacterTable
            characters={ characterData }
            onSelect={ handleSelect }
          />
        </div>
        <div>
          <ADD2CharacterDetails
            selectedChar={ selected }
            gateway={ serverGateway }
            onUpdate={ handleUpdate }
          />
          {
            selected && <button onClick={ () => handleDelete(selected.id) }>Delete</button>
          }
        </div>
      </div>
    );
  //}
}
