import React, {Component} from 'react';

export default class ADD2AlignmentSelection extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        if(e.target.value) {
            const {selectedChar, onUpdate} = this.props;
            ADD2AlignmentSelection.saveCharacter(selectedChar, e.target.value, onUpdate);
        }
    }

    static saveCharacter(selectedChar, alignment, onUpdate) {
        selectedChar.alignment = alignment;
        selectedChar.completionStep++;
        onUpdate(selectedChar);
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
                <select data-cy='alignmentSelect' onChange={this.handleChange}>
                    <option key={-1} value=''/>
                    {options}
                </select>
            </div>
        );
    }
}