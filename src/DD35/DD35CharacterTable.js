import React, { useState, useEffect } from 'react';

export default function DD35CharacterTable ({ gateway, onSelect }) {
  // constructor(props) {
  //   super(props);
  //   this.state = { newCharName: '', characterData: [] };
  //   this.isUnmounted = false;
  // }

  const [newCharName, setNewCharName] = useState('');
  const [characterData, setCharacterData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await gateway.get();
      setCharacterData(data);
    }

    // noinspection JSIgnoredPromiseFromCall
    fetchData();
  }, []);

  // async componentDidMount() {
  //   const { gateway } = this.props;
  //   const data = await gateway.get();
  //
  //   if (!this.isUnmounted)
  //     this.setState({ characterData: data });
  // }
  //
  // componentWillUnmount() {
  //   this.isUnmounted = true;
  // }

  async function handleCreate() {
    // const { newCharName, characterData } = this.state;
    // const { gateway } = this.props;

    function newNameIsUnique(name) {
      const index = characterData.findIndex(function(c) {
        return c.name === name;
      });
      return index === -1;
    }

    if (newCharName.trim() && newNameIsUnique(newCharName)) {
      let newId;
      const characters = characterData;
      if (characters.length === 0)
        newId = 1;
      else
        newId = characters[characters.length - 1].id + 1;

      const newChar = { id: newId, name: newCharName };
      const newCharList = characters.concat([newChar]);
      // this.setState({ characterData: newCharList, newCharName: '' });
      setCharacterData(newCharList);
      setNewCharName('');

      await gateway.createCharacter(newChar);
    } else {
      // this.setState({ newCharName: '' });
      setNewCharName('');
    }
  }

  async function handleDelete(id) {
    // const { characterData } = this.state;
    // const { gateway } = this.props;
    const index = characterData.findIndex(function(c) {
      return c.id === id;
    });

    const charToDelete = characterData[index];

    if (window.confirm(`Are you sure you want to delete ${charToDelete.name}?`)) {
      characterData.splice(index, 1);

      // this.setState({ characterData: characterData });
      setCharacterData(characterData);
      await gateway.deleteCharacter(id);
    }
  }

  function handleNewNameChange(e) {
    // this.setState({ newCharName: e.target.value });
    setNewCharName(e.target.value);
  }

  async function handleKeyPress(e){
    if (e.key === 'Enter')
      await handleCreate();
  }

  // render() {
  //   const { newCharName, characterData } = this.state;
  //   const { onSelect } = this.props;

    const rowItems = characterData.map(function(item) {
      return <tr key={item.id}>
        <td>{item.name}</td>
        <td>
          <button onClick={ () => onSelect(item) }>Edit</button>
        </td>
        <td>
          <button onClick={ async () => await handleDelete(item.id) }>Delete</button>
        </td>
      </tr>
    });

    return (
      <div>
        <button onClick={ () => handleCreate() }>Create</button>
        <input
          type='text'
          maxLength='32'
          placeholder='new name'
          value={ newCharName }
          onChange={ (e) => handleNewNameChange(e) }
          onKeyUp={ handleKeyPress }
        />
        { characterData.length < 1 && <p>No characters</p> }
        { characterData.length > 0 &&
          <table>
            <thead>
            <tr>
              <th>Name</th>
              <th/>
              <th/>
            </tr>
            </thead>
            <tbody>
            {rowItems}
            </tbody>
          </table>
        }
      </div>
    );
  // }
}
