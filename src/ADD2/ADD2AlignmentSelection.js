import React, {Component} from 'react';

export default class ADD2AlignmentSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedAlignment: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleChange(e) {
        this.setState({selectedAlignment: e.target.value});
    }

    handleUpdate() {
        const {selectedAlignment} = this.state;
        const {selectedChar, onUpdate} = this.props;

        if(!selectedAlignment)
            alert('must select an alignment to save');
        else {
            selectedChar.alignment = selectedAlignment;
            selectedChar.completionStep++;
            onUpdate(selectedChar);
        }
    }

    render() {
        const {selectedChar} = this.props;
        let id = 0;
        const options = selectedChar.availableAlignments && selectedChar.availableAlignments.map(function(item) {
            return <option key={id++} value={item}>{item}</option>
        });

        return (
            <div>
                STR: {selectedChar.str} <br/>
                DEX: {selectedChar.dex} <br/>
                CON: {selectedChar.con} <br/>
                INT: {selectedChar.int} <br/>
                WIS: {selectedChar.wis} <br/>
                CHR: {selectedChar.chr} <br/>
                Race: {selectedChar.race} Gender: {selectedChar.gender} Class: {selectedChar.className} <br/>
                Select alignment:
                <select onChange={this.handleChange}>
                    <option key={-1} value=''/>
                    {options}
                </select>
                <button onClick={this.handleUpdate}>Save</button>
            </div>
        );
    }
}