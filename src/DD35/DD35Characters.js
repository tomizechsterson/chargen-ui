import React, {Component} from 'react';
import DD35CharacterTable from "./DD35CharacterTable";
import DD35CharacterCreate from "./DD35CharacterCreate";

export default class DD35Characters extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedChar: undefined};

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(character) {
        this.setState({selectedChar: character});
    }

    render() {
        const {selectedChar} = this.state;

        return (
            <div>
                {selectedChar && <DD35CharacterCreate/>}
                {!selectedChar && <DD35CharacterTable onSelect={this.handleSelect}/>}
            </div>
        );
    }
}