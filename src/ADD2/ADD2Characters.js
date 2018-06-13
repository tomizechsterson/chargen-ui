import React, {Component} from 'react';
import ADD2CharacterTable from './ADD2CharacterTable';
import ADD2CharacterDetails from './ADD2CharacterDetails';

const testData = [
    {
        id: 1,
        name: 'Big McLargeHuge',
        playedBy: 'someone',
        completionStep: 2,
        str: 18,
        dex: 14,
        con: 9,
        int: 16,
        wis: 11,
        chr: 12,
        race: 'Elf',
        gender: 'M',
        height: 60,
        weight: 110,
        age: 110,
        className: 'Fighter',
        alignment: 'Lawful Good',
        paralyze: 14,
        rod: 16,
        petrification: 15,
        breath: 17,
        spell: 17,
        hp: 9,
        moveRate: 12,
        funds: 170
    },
    {
        id: 2,
        name: 'Gristle',
        playedBy: 'someone else',
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
    },
    {
        id: 3,
        name: 'Crunch',
        playedBy: 'person',
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
    },
    {
        id: 4,
        name: 'Rip',
        playedBy: 'another person',
        completionStep: 2,
        str: 12,
        dex: 12,
        con: 10,
        int: 6,
        wis: 18,
        chr: 15,
        race: 'Dwarf',
        gender: 'M',
        height: 45,
        weight: 150,
        age: 60,
        className: 'Cleric',
        alignment: 'Chaotic Good',
        paralyze: 10,
        rod: 14,
        petrification: 13,
        breath: 16,
        spell: 15,
        hp: 8,
        moveRate: 6,
        funds: 150
    },
    {
        id: 5,
        name: 'Swift',
        playedBy: 'Generic McRandom',
        completionStep: 2,
        str: 12,
        dex: 12,
        con: 10,
        int: 18,
        wis: 7,
        chr: 15,
        race: 'Human',
        gender: 'F',
        height: 65,
        weight: 110,
        age: 18,
        className: 'Mage',
        alignment: 'Neutral Good',
        paralyze: 14,
        rod: 11,
        petrification: 13,
        breath: 15,
        spell: 12,
        hp: 4,
        moveRate: 12,
        funds: 50
    }
];

const useTestData = true;

export default class ADD2Characters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characterData: [],
            selected: null
        };

        this.handleSelect = this.handleSelect.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    loadCharsFromServer() {
        if (useTestData)
            this.setState({characterData: testData});
        else {
            const xhr = new XMLHttpRequest();
            xhr.open('get', 'http://localhost:42000/api/add2character', true);
            xhr.onload = function () {
                const responseData = JSON.parse(xhr.responseText);
                this.setState({characterData: responseData});
            }.bind(this);
            xhr.send();
        }
    }

    handleSelect(id) {
        if (this.state.selected === null) {
            for (let i = 0; i < this.state.characterData.length; i++) {
                if (this.state.characterData[i].id === id) {
                    this.setState({selected: this.state.characterData[i]});
                }
            }
        }
        else {
            for (let i = 0; i < this.state.characterData.length; i++) {
                if (this.state.characterData[i].id === id && this.state.selected.id !== id) {
                    this.setState({selected: this.state.characterData[i]});
                }
            }
        }
    }

    handleDelete(id) {
        const index = this.state.characterData.findIndex(function (o) {
            return o.id === id;
        });

        const charToDelete = this.state.characterData[index];

        if(window.confirm('Are you sure you want to delete ' + charToDelete.name + ', the ' + charToDelete.race + ' ' + charToDelete.className + '?')) {
            this.state.characterData.splice(index, 1);

            if(charToDelete.id === this.state.selected.id)
                this.setState({selected: null});
            else
                this.setState({selected: this.state.selected});

            if (!useTestData) {
                const xhr = new XMLHttpRequest();
                xhr.open('delete', 'http://localhost:42000/api/add2character/' + id, true);
                xhr.onload = function () {
                    this.loadCharsFromServer();
                }.bind(this);
                xhr.send();
            }
        }
    }

    componentDidMount() {
        this.loadCharsFromServer();
    }

    render() {
        const topLevelColumnsStyle = {
            columnCount: 2,
            columnRuleStyle: 'solid',
            columnFill: 'balance',
            breakAfter: 'column'
        };

        return (
            <div style={topLevelColumnsStyle}>
                <ADD2CharacterTable characters={this.state.characterData}
                                    onSelect={this.handleSelect}
                                    onDelete={this.handleDelete} />
                <div>
                    <ADD2CharacterDetails selectedChar={this.state.selected}
                                          onDelete={this.handleDelete} />
                </div>
            </div>
        );
    }
}