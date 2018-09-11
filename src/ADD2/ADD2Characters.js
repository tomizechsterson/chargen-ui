import React, {Component} from 'react';
import ADD2CharacterTable from './ADD2CharacterTable';
import ADD2CharacterDetails from './ADD2CharacterDetails';

export default class ADD2Characters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characterData: [],
            selected: null,
            newCharName: ''
        };

        this.handleSelect = this.handleSelect.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    loadCharsFromServer() {
        const {useTestData, testData, serverGateway} = this.props;
        if (useTestData)
            this.setState({characterData: testData});
        else {
            serverGateway.getChars(function(response) {
                this.setState({characterData: response});
            }.bind(this), function(error) {
                console.error(error);
            });
        }
    }

    handleSelect(id) {
        const {selected, characterData} = this.state;
        if (!selected) {
            for (let i = 0; i < characterData.length; i++) {
                if (characterData[i].id === id) {
                    this.setState({selected: characterData[i]});
                }
            }
        }
        else {
            for (let i = 0; i < characterData.length; i++) {
                if (characterData[i].id === id && selected.id !== id) {
                    this.setState({selected: characterData[i]});
                }
            }
        }
    }

    handleDelete(id) {
        const {useTestData, serverGateway} = this.props;
        const {characterData, selected} = this.state;
        const index = characterData.findIndex(function (o) {
            return o.id === id;
        });

        const charToDelete = characterData[index];

        if(window.confirm('Are you sure you want to delete ' + charToDelete.name + ', the ' + charToDelete.race + ' ' + charToDelete.className + '?')) {
            characterData.splice(index, 1);

            if(charToDelete.id === selected.id)
                this.setState({selected: null});

            if (!useTestData) {
                serverGateway.deleteChar(id, function() {
                    this.loadCharsFromServer();
                }.bind(this), function(error) {
                    console.error(error);
                });
            }
        }
    }

    handleUpdate(character) {
        const {useTestData, serverGateway} = this.props;
        const chars = this.state.characterData;
        const i = chars.findIndex(function(o) {return o.id === character.id});
        chars[i] = character;
        this.setState({characterData: chars});

        if(character.completionStep === 2) {
            serverGateway.getRaces(character, function(response) {
                character.availableRaces = response;
            }, function(error) {
                console.error(error);
            });
        }

        if(character.completionStep === 3) {
            serverGateway.getClasses(character, function(response) {
                character.availableClasses = response;
            }, function(error) {
                console.error(error);
            });
        }

        if(!useTestData) {
            serverGateway.updateChar(character, function() {
                this.loadCharsFromServer();
            }.bind(this), function(error) {
                console.error(error);
            });
        }
    }

    handleCreate() {
        const {useTestData, serverGateway} = this.props;
        const {newCharName, characterData} = this.state;

        function newNameIsUnique(newCharName) {
            const index = characterData.findIndex(function(c) {
                return c.name === newCharName;
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

            const newChar = {id: newId, name: newCharName,
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
                funds: 0};
            const newCharList = characters.concat([newChar]);
            this.setState({characterData: newCharList, newCharName: ''});

            if(!useTestData) {
                serverGateway.createChar(newChar, function() {
                    this.loadCharsFromServer();
                }.bind(this), function(error) {
                    console.error('error: '); console.error(error);
                });
            }
        }
        else
            this.setState({newCharName: ''});
    }

    handleNewNameChange(e) {
        this.setState({newCharName: e.target.value});
    }

    componentDidMount() {
        this.loadCharsFromServer();
    }

    render() {
        const {newCharName, characterData, selected} = this.state;
        const {serverGateway} = this.props;
        const topLevelColumnsStyle = {
            columnCount: 2,
            columnRuleStyle: 'solid',
            columnFill: 'balance',
            breakAfter: 'column'
        };

        return (
            <div style={topLevelColumnsStyle}>
                <div>
                    <button onClick={() => this.handleCreate()}>Create</button>
                    <input type='text' maxLength='32' placeholder='character name' value={newCharName}
                           onChange={(e) => this.handleNewNameChange(e)}/>
                    <ADD2CharacterTable characters={characterData} onSelect={this.handleSelect} />
                </div>
                <div>
                    <ADD2CharacterDetails selectedChar={selected} gateway={serverGateway}
                                          onDelete={this.handleDelete} onUpdate={this.handleUpdate} />
                    {selected && <button onClick={() => this.handleDelete(selected.id)}>Delete</button>}
                </div>
            </div>
        );
    }
}