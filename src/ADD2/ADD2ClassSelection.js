import React, {Component} from 'react';

export default class ADD2ClassSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedClass: ''};

        this.handleClassChange = this.handleClassChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleClassChange(e) {
        this.setState({selectedClass: e.target.value});
    }

    handleUpdate() {
        const {selectedClass} = this.state;
        const {selectedChar, onUpdate} = this.props;

        if (!selectedClass)
            alert('must select a class to save');
        else {
            selectedChar.className = selectedClass;
            selectedChar.completionStep++;
            onUpdate(selectedChar);
        }
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
                Select class:
                <select onChange={this.handleClassChange}>
                    <option key={-1} value=''/>
                    {options}
                </select>
                <button onClick={this.handleUpdate}>Save</button>
            </div>
        );
    }
}