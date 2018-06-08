import React, {Component} from 'react';

export default class ADD2CharacterTable extends Component {
    constructor(props) {
        super(props);

        ADD2CharacterTable.createRows = ADD2CharacterTable.createRows.bind(this);
    }

    static createRows(item) {
        return <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.playedBy}</td>
            <td>No</td>
        </tr>
    }

    render() {
        const tableStyle = {
            width: '100%'
        };

        const entries = this.props.characters;
        const rowItems = entries.map(ADD2CharacterTable.createRows);

        return (
            <table style={tableStyle}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Played By</th>
                    <th>Completed?</th>
                </tr>
                </thead>
                <tbody>
                {rowItems}
                </tbody>
            </table>
        );
    }
}