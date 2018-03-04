import React, {Component} from 'react';
import {Input} from 'reactstrap';
import {connect} from 'react-redux';
import _ from 'lodash';
import {updateField, addValidated, removeValidated, enableField, disableField} from '../../actions';


class Values extends Component {

    handleInput(e) {
        e.preventDefault();
        const target = e.target;
        const value = e.target.value;
        const name = target.name;
        const _id = this.props.val;
        this.props.updateField({[name]: value}, this.props.val);
        const object = _.find(this.props.dataToSave, {_id});
        console.log(this.props.val);


        //calculate 'fromThisOk'
        if (object.items.totalChecked >= 0 && object.items.reworked >= 0 && object.items.nok >= 0) {
            this.props.updateField({'fromThisOk': object.items.totalChecked - object.items.reworked - object.items.nok}, this.props.val);
        }

        //calculate 'totalOk'
        if (object.items.totalChecked >= 0 && object.items.nok >= 0) {
            this.props.updateField({'totalOk': object.items.totalChecked - object.items.nok}, this.props.val);
        }

        //validation
        const {partNumber, totalChecked, reworked, nok, remarks} = object.items;
        if (partNumber.length > 0
            && partNumber.length <= 10
            && totalChecked > 0
            && totalChecked <= 99999
            && reworked > 0
            && reworked <= 99999
            && nok > 0
            && nok <= 99999
            // && remarks.length > 0
            && remarks.match(/^[0-9a-z]+$/)
            && remarks.length <= 30) {
            this.props.addValidated(_id);
            this.props.update();
        } else {
            this.props.removeValidated(_id);
            this.props.update();
        }

        this.props.update();
    }

    render() {
        const {partNumber, totalChecked, reworked, nok, remarks, totalOk, fromThisOk} = this.props;

        return (
            <tr>
                <td><Input type="text" name="partNumber" placeholder="Enter number" value={partNumber}
                           onChange={this.handleInput.bind(this)}/></td>
                <td><Input type="text" name="totalChecked" placeholder="Enter number" value={totalChecked}
                           onChange={this.handleInput.bind(this)}/></td>
                <td><Input name="fromThisOk" placeholder={fromThisOk} value={fromThisOk} className="text-center"
                           readOnly/></td>
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
        dataToSave: state.dataToSave.dataToSave,
        validation: state.dataToSave.validated
    };
};

export default connect(mapStateToProps, {
    updateField,
    addValidated,
    removeValidated,
    enableField,
    disableField
})(Values);