import React, {Component} from 'react';

export default class ADD2CharacterTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const tableStyle = {
            width: "100%"
        };

        return (
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Played By</th>
                        <th>Completed?</th>
                    </tr>
                </thead>
            </table>
        );
    }
}