import React, {Component} from 'react';
import './ADD2CharacterTable.css';

export default class ADD2CharacterTable extends Component {
    constructor(props) {
        super(props);

        ADD2CharacterTable.createRows = ADD2CharacterTable.createRows.bind(this);
    }

    static createRows(item) {
        return <tr key={item.id} onClick={() => alert('clicked row:\nid:' + item.id)}>
            <td>{item.name}</td>
            <td>{item.playedBy}</td>
            <td>No</td>
        </tr>
    }

    render() {
        const entries = this.props.characters;
        const rowItems = entries.map(ADD2CharacterTable.createRows);

        return (
            <table>
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