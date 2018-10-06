import React, {Component} from 'react';

export default class DD35CharacterTable extends Component {
    constructor(props) {
        super(props);
        this.state = {newCharName: '', characterData: []};
        const {gateway} = this.props;

        gateway.getChars(function(response) {
            this.setState({newCharName: '', characterData: response});
        }.bind(this), function(error) {
            console.error(error);
        });
    }

    async handleCreate() {
        const {newCharName, characterData} = this.state;
        const {gateway} = this.props;

        function newNameIsUnique(name) {
            const index = characterData.findIndex(function(c) {
                return c.name === name;
            });
            return index === -1;
        }

        if(newCharName.trim() && newNameIsUnique(newCharName)) {
            let newId = 0;
            const characters = characterData;
            if(characters.length === 0)
                newId = 1;
            else
                newId = characters[characters.length - 1].id + 1;

            const newChar = {id: newId, name: newCharName};
            const newCharList = characters.concat([newChar]);
            this.setState({characterData: newCharList, newCharName: ''});

            await gateway.createNew(newChar);
        }
        else
            this.setState({newCharName: ''});
    }

    async handleDelete(id) {
        const {characterData} = this.state;
        const {gateway} = this.props;
        const index = characterData.findIndex(function(c) {
            return c.id === id;
        });

        characterData.splice(index, 1);
        this.setState({characterData: characterData});

        await gateway.deleteNew(id);
    }

    handleNewNameChange(e) {
        this.setState({newCharName: e.target.value});
    }

    handleKeyPress = event => {
        if(event.key === 'Enter')
            this.handleCreate();
    };

    render() {
        const {newCharName, characterData} = this.state;
        const {onSelect} = this.props;

        const rowItems = characterData.map(function(item) {
            return <tr key={item.id}>
                <td>{item.name}</td>
                <td><button onClick={() => onSelect(item)}>Edit</button></td>
                <td><button onClick={() => this.handleDelete(item.id)}>Delete</button></td>
            </tr>
        }.bind(this));

        return (
            <div>
                <button onClick={() => this.handleCreate()}>Create</button>
                <input type='text' maxLength='32' placeholder='new name' value={newCharName}
                       onChange={(e) => this.handleNewNameChange(e)} onKeyPress={this.handleKeyPress} />
                {characterData.length < 1 && <p>No characters</p>}
                {characterData.length > 0 &&
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
                </table>}
            </div>
        );
    }
}