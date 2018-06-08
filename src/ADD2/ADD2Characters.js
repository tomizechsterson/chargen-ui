import React, {Component} from "react";
import ADD2CharacterTable from './ADD2CharacterTable';

const testData = [
    {id: 1, name: 'Biff', playedBy: 'someone', completionStep: 2, str: 18, dex: 14, con: 9, int: 16, wis: 11, chr: 12},
    {id: 2, name: 'Gristle', playedBy: 'someone else', completionStep: 1, str: 0, dex: 0, con: 0, int: 0, wis: 0, chr: 0},
    {id: 3, name: 'Crunch', playedBy: 'person', completionStep: 1, str: 0, dex: 0, con: 0, int: 0, wis: 0, chr: 0},
    {id: 4, name: 'Rip', playedBy: 'another person', completionStep: 2, str: 12, dex: 12, con: 10, int: 6, wis: 18, chr: 15}
];

const useTestData = true;

export default class ADD2Characters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    loadCharsFromServer() {
        if(useTestData)
            this.setState({data: testData});
        else
        {
            const xhr = new XMLHttpRequest();
            xhr.open('get', 'https://add20-dev.azurewebsites.net/api/add2character', true);
            xhr.onload = function() {
                const data = JSON.parse(xhr.responseText);
                this.setState({data: data});
            }.bind(this);
            xhr.send();
        }
    }

    componentDidMount() {
        this.loadCharsFromServer();
    }

    render() {
        const topLevelStyle = {
            columnCount: 2,
            columnRuleStyle: "solid"
        };

        return (
            <div style={topLevelStyle}>
                <ADD2CharacterTable characters={this.state.data} />
                <p className="selectedADD2Column">Selected Character Details</p>
            </div>
        );
    }
}