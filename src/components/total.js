import React, {Component} from 'react';
import {Input} from 'reactstrap';

class Total extends Component {

    calculations(field) {
        let a = 0;
        let f = 0;

        a = this.calculateValues(this.props.data, field);
        if (this.props.dataToSave.length > 0) {
            const result = this.props.dataToSave.map(a => a.items);
            f = this.calculateValues(result, field);
        }

        return a + f;
    }

    calculateValues(obj, field) {
        return obj.map(i => parseInt(i[field], 10) ? parseInt(i[field], 10) : 0).reduce((prev, next) => prev + next);
    }

    render() {

        return (
            <tbody>
            {this.props.data.length !== 0 ?
                <tr>
                    <td className="float-right"><h5>Total: </h5></td>
                    <td><Input type="text" name="totalChecked" value={this.calculations('totalChecked')} readOnly/></td>
                    <td><Input type="text" name="fromThisOk" value={this.calculations('fromThisOk')} readOnly/></td>
                    <td><Input type="text" name="reworked" value={this.calculations('reworked')} readOnly/></td>
                    <td><Input type="text" name="nok" value={this.calculations('nok')} readOnly/></td>
                    <td><Input type="text" name="totalOk" value={this.calculations('totalOk')} readOnly/></td>
                </tr>
                : null}
            </tbody>
        );
    }
}

export default Total;