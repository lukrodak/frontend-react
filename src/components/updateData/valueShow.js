import React, {Component} from 'react';
import _ from 'lodash';
import {Input} from 'reactstrap';
import {connect} from 'react-redux';
import {updateOldField, addOldValidated, removeOldValidated} from '../../actions';

class ValueShow extends Component {

    handleInput(e) {
        const target = e.target;
        const value = e.target.value;
        const name = target.name;
        const _id = this.props.val;
        const object = _.find(this.props.data, {_id});

        this.props.updateOldField({[name]: value}, this.props.val);

        //calculate 'fromThisOk'
        if (object.totalChecked >= 0 && object.reworked >= 0 && object.nok >= 0) {
            this.props.updateOldField({'fromThisOk': object.totalChecked - object.reworked - object.nok}, this.props.val);
        }

        //calculate 'totalOk'
        if (object.totalChecked >= 0 && object.nok >= 0) {
            this.props.updateOldField({'totalOk': object.totalChecked - object.nok}, this.props.val);
        }

        const {partNumber, totalChecked, reworked, nok, remarks} = object;
        if (partNumber.length <= 10 && partNumber.length > 0 && totalChecked > 0 && totalChecked <= 99999 && reworked > 0
            && reworked <= 99999 && nok > 0 && nok <= 99999 && remarks.length > 0 && remarks.length <= 30) {
            this.props.addOldValidated(_id);
        } else {
            this.props.removeOldValidated(_id);
        }

        this.props.update();
    }

    render() {

        const {partNumber, totalChecked, reworked, nok, remarks, fromThisOk, totalOk} = this.props;

        return (
            <tr>
                <td><Input type="text" name="partNumber" placeholder="Part no" value={partNumber}
                           onChange={this.handleInput.bind(this)}/></td>
                <td><Input type="text" name="totalChecked" placeholder="Enter number" value={totalChecked}
                           onChange={this.handleInput.bind(this)}/></td>
                <td><Input name="fromThisOk" placeholder="0" value={fromThisOk} className="text-center" readOnly/></td>
                <td><Input type="text" name="reworked" placeholder="Enter number" value={reworked}
                           onChange={this.handleInput.bind(this)}/></td>
                <td><Input type="text" name="nok" placeholder="Enter number" value={nok}
                           onChange={this.handleInput.bind(this)}/></td>
                <td><Input name="totalOk" placeholder="0" value={totalOk} className="text-center" readOnly/></td>
                <td><Input type="text" name="remarks" value={remarks} onChange={this.handleInput.bind(this)}/></td>
            </tr>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        data: state.data.data
    };
};

export default connect(mapStateToProps, {updateOldField, addOldValidated, removeOldValidated})(ValueShow);