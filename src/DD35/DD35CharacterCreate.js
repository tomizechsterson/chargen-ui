import React, {Component} from 'react';

export default class DD35CharacterCreate extends Component {
    render() {
        const {onClose} = this.props;

        return (
            <button onClick={() => onClose()}>Close</button>
        );
    }
}