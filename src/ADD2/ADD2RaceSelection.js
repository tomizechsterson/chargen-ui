import React, {Component} from 'react';
import StatAdjustmentDisplay from "../GeneralDisplays/StatAdjustmentDisplay";

export default class ADD2RaceSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedRace: '', adjustments: undefined, selectedGender: ''};

        this.handleRaceChange = this.handleRaceChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    async handleRaceChange(e) {
        if(e.target.value) {
            const {gateway} = this.props;
            this.setState({selectedRace: e.target.value});
            const data = await gateway.getAdjustments(e.target.value);
            this.setState({adjustments: data});
        }
        else {
            this.setState({selectedRace: '', adjustments: undefined});
        }
    }

    handleGenderChange(e) {
        this.setState({selectedGender: e.target.value});
    }

    handleUpdate() {
        const {selectedRace, selectedGender} = this.state;
        const {selectedChar, onUpdate} = this.props;

        if(!selectedRace)
            alert('must select a race to save');
        else if(!selectedGender)
            alert('must select a gender to save');
        else {
            selectedChar.str += this.getAdjustment('str');
            selectedChar.dex += this.getAdjustment('dex');
            selectedChar.con += this.getAdjustment('con');
            selectedChar.int += this.getAdjustment('int');
            selectedChar.wis += this.getAdjustment('wis');
            selectedChar.chr += this.getAdjustment('chr');
            selectedChar.race = selectedRace;
            selectedChar.gender = selectedGender;
            selectedChar.completionStep++;
            onUpdate(selectedChar);
        }
    }

    getAdjustment(stat) {
        const {adjustments} = this.state;
        let value = 0;
        adjustments.forEach(function(item) {
            if(item.key === stat) {
                value = item.value;
            }
        });
        return value;
    }

    render() {
        const {selectedChar} = this.props;
        const {adjustments} = this.state;

        let id = 0;
        const options = selectedChar.availableRaces && selectedChar.availableRaces.map(function(item) {
            return <option key={id++} value={item}>{item}</option>
        });
        return (
            <div>
                <StatAdjustmentDisplay text={'STR: '} stat={selectedChar.str} adjustment={adjustments && this.getAdjustment('str')}/>
                <StatAdjustmentDisplay text={'DEX: '} stat={selectedChar.dex} adjustment={adjustments && this.getAdjustment('dex')}/>
                <StatAdjustmentDisplay text={'CON: '} stat={selectedChar.con} adjustment={adjustments && this.getAdjustment('con')}/>
                <StatAdjustmentDisplay text={'INT: '} stat={selectedChar.int} adjustment={adjustments && this.getAdjustment('int')}/>
                <StatAdjustmentDisplay text={'WIS: '} stat={selectedChar.wis} adjustment={adjustments && this.getAdjustment('wis')}/>
                <StatAdjustmentDisplay text={'CHR: '} stat={selectedChar.chr} adjustment={adjustments && this.getAdjustment('chr')}/>
                Select race:
                <select data-cy='raceSelect' onChange={this.handleRaceChange}>
                    <option key={-1} value='' />
                    {options}
                </select>
                Select Gender:
                <input type='radio' name='gender' value='M' id='m' onChange={this.handleGenderChange}/><label htmlFor='m'>Male</label>
                <input type='radio' name='gender' value='F' id='f' onChange={this.handleGenderChange}/><label htmlFor='f'>Female</label>
                <br/>
                <button onClick={this.handleUpdate}>Save</button>
            </div>
        );
    }
}