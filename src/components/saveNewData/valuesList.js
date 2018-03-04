import React, {Component} from 'react';
import Values from './value';

class ValuesList extends Component {
    render() {
        return (
            <tbody>
            {this.props.data.map((props) => {
                return (
                    <Values
                        key={props._id}
                        val={props._id}
                        update={this.props.update}
                        {...props.items}
                    />
                );
            })}
            </tbody>
        );
    }
}

export default ValuesList;