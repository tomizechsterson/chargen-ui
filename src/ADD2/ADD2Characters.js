import React, {Component} from 'react';
import ADD2CharacterTable from './ADD2CharacterTable';
import ADD2CharacterDetails from './ADD2CharacterDetails';

const testData = [
    {id: 1, name: 'Big McLargeHuge', playedBy: 'someone', completionStep: 2, str: 18, dex: 14, con: 9, int: 16, wis: 11, chr: 12},
    {id: 2, name: 'Gristle', playedBy: 'someone else', completionStep: 1, str: 0, dex: 0, con: 0, int: 0, wis: 0, chr: 0},
    {id: 3, name: 'Crunch', playedBy: 'person', completionStep: 1, str: 0, dex: 0, con: 0, int: 0, wis: 0, chr: 0},
    {id: 4, name: 'Rip', playedBy: 'another person', completionStep: 2, str: 12, dex: 12, con: 10, int: 6, wis: 18, chr: 15},
    {id: 5, name: 'Swift', playedBy: 'Generic McRandom', completionStep: 2, str: 12, dex: 12, con: 10, int: 6, wis: 18, chr: 15}
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
        this.loadCharsFromServer = this.loadCharsFromServer.bind(this);
    }

    loadCharsFromServer() {
        if(useTestData)
            this.setState({characterData: testData});
        else
        {
            const xhr = new XMLHttpRequest();
            xhr.open('get', 'http://localhost:42000/api/add2character', true);
            xhr.onload = function() {
                const responseData = JSON.parse(xhr.responseText);
                this.setState({characterData: responseData});
            }.bind(this);
            xhr.send();
        }
    }

    handleSelect(id) {
        if(this.state.selected === null) {
            for(let i = 0; i < this.state.characterData.length; i++) {
                if(this.state.characterData[i].id === id) {
                    this.setState({selected: this.state.characterData[i]});
                }
            }
        }
        else {
            for(let i = 0; i < this.state.characterData.length; i++) {
                if(this.state.characterData[i].id === id && this.state.selected.id !== id) {
                    this.setState({selected: this.state.characterData[i]});
                }
            }
        }
    }

    componentWillMount() {
        console.log('componentWillMount');
    }

    componentDidMount() {
        console.log('componentDidMount');
        this.loadCharsFromServer();
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
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
                                    onCharacterSelect={this.handleSelect} />
                <div>
                    <ADD2CharacterDetails selectedChar={this.state.selected}/>
                </div>
            </div>
        );
    }
}