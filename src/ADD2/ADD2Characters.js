import React, {Component} from "react";
import ADD2CharacterTable from './ADD2CharacterTable';

export default class ADD2Characters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    loadCharsFromServer() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', 'http://localhost:42000/api/add2character', true);
        xhr.onload = function() {
            const data = JSON.parse(xhr.responseText);
            this.setState({data: data});
        }.bind(this);
        xhr.send();
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