import React, {Component} from 'react';

export default class ADD2ClassSelection extends Component {
    constructor(props) {
        super(props);

        this.handleClassChange = this.handleClassChange.bind(this);
    }

    handleClassChange(e) {
        if(e.target.value) {
            const {selectedChar, onUpdate} = this.props;
            ADD2ClassSelection.saveCharacter(selectedChar, e.target.value, onUpdate);
        }
    }

    static saveCharacter(selectedChar, selectedClass, onUpdate) {
        selectedChar.className = selectedClass;
        selectedChar.completionStep++;
        onUpdate(selectedChar);
    }

    render() {
        const {selectedChar} = this.props;
        let id = 0;
        const options = selectedChar.availableClasses && selectedChar.availableClasses.map(function (item) {
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
                Race: {selectedChar.race} Gender: {selectedChar.gender} <br/>
                Select class:
                <select data-cy='classSelect' onChange={this.handleClassChange}>
                    <option key={-1} value=''/>
                    {options}
                </select>
            </div>
        );
    }
}