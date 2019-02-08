import React, {Component} from 'react';
import DD35CharacterTable from "./DD35CharacterTable";
import DD35CharacterCreate from "./DD35CharacterCreate";

export default class DD35Characters extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedChar: undefined};

        this.handleSelect = this.handleSelect.bind(this);
        this.handleDeselect = this.handleDeselect.bind(this);
    }

    handleSelect(character) {
        this.setState({selectedChar: character});
    }

    handleDeselect() {
        this.setState({selectedChar: undefined});
    }

    render() {
        const {selectedChar} = this.state;
        const {gateway} = this.props;

        return (
            <div>
                {selectedChar && <DD35CharacterCreate selectedChar={selectedChar} onClose={this.handleDeselect}/>}
                {!selectedChar && <DD35CharacterTable onSelect={this.handleSelect} gateway={gateway}/>}
            </div>
        );
    }
}
