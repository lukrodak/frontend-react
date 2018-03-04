import React, {Component} from 'react';
import ValueShow from './valueShow';

class ValuesListShow extends Component {
    render() {
        return (
            <tbody>
            {this.props.data.map((props, index) => {
                return (
                    <ValueShow
                        key={props._id}
                        val={props._id}
                        index={index}
                        update={this.props.update}
                        {...props}/>
                );
            })}
            </tbody>
        );
    }
}

export default ValuesListShow;