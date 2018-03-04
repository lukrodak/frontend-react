import React, {Component} from 'react';
import {Input} from 'reactstrap';
import {connect} from 'react-redux';
import _ from 'lodash';
import {updateField, addValidated, removeValidated, enableField, disableField} from '../../actions';

class Values extends Component {
    state = {
        partNumber: 'warning',
        totalChecked: 'warning',
        reworked: 'warning',
        nok: 'warning',
        remarks: 'warning'
    }


    checkField(items) {
        const {partNumber, totalChecked, reworked, nok, remarks} = items;
        let array = [];

        if (partNumber.length > 0 && partNumber.length <= 10 && partNumber.match(/^[0-9a-z]+$/)) {
            this.setState({partNumber: ''});
            if (!_.find(array, 'partNumber')) {
                array.push('partNumber');
            }
        } else {
            this.setState({partNumber: 'warning'});
            const index = _.findIndex(array, 'partNumber');
            array.splice(index, 1);
        }

        if (totalChecked.length > 0 && totalChecked.length <= 5 && Number.parseInt(totalChecked) >= Number.parseInt(reworked) && Number.parseInt(totalChecked) >= Number.parseInt(nok) && totalChecked.match(/^[0-9]+$/)) {
            console.log('totalChecked');
            console.log(totalChecked);
            this.setState({totalChecked: ''});
            if (!_.find(array, 'totalChecked')) {
                array.push('totalChecked');
            }
        } else {
            console.log('totalChecked');
            console.log(Number.parseInt(totalChecked));
            this.setState({totalChecked: 'warning'});
            const index = _.findIndex(array, 'totalChecked');
            array.splice(index, 1);
        }


        if (reworked.length > 0 && reworked.length <= 5 && Number.parseInt(reworked) <= Number.parseInt(totalChecked) && reworked.match(/^[0-9]+$/)) {
            this.setState({reworked: ''});
            if (!_.find(array, 'reworked')) {
                array.push('reworked');
            }
        } else {
            this.setState({reworked: 'warning'});
            const index = _.findIndex(array, 'reworked');
            array.splice(index, 1);
        }

        if (nok.length > 0 && nok.length <= 5 && Number.parseInt(nok) <= Number.parseInt(totalChecked) && nok.match(/^[0-9]+$/)) {
            this.setState({nok: ''});
            if (!_.find(array, 'nok')) {
                array.push('nok');
            }
        } else {
            this.setState({nok: 'warning'});
            const index = _.findIndex(array, 'nok');
            array.splice(index, 1);
        }

        if (remarks.length > 0 && remarks.length <= 30 && remarks.match(/^[0-9a-z]+$/)) {
            this.setState({remarks: ''});
            if (!_.find(array, 'remarks')) {
                array.push('remarks');
            }
        } else {
            this.setState({remarks: 'warning'});
            const index = _.findIndex(array, 'remarks');
            array.splice(index, 1);
        }

        if (array.length === 5) {
            return true;
        } else {
            return false;
        }

    }

    handleInput(e) {
        e.preventDefault();
        const target = e.target;
        const value = e.target.value;
        const name = target.name;
        const _id = this.props.val;
        this.props.updateField({[name]: value}, _id);
        const object = _.find(this.props.dataToSave, {_id});

        //calculate 'fromThisOk'
        if (object.items.totalChecked >= 0 && object.items.reworked >= 0 && object.items.nok >= 0) {
            this.props.updateField({'fromThisOk': object.items.totalChecked - object.items.reworked - object.items.nok}, this.props.val);
        }

        //calculate 'totalOk'
        if (object.items.totalChecked >= 0 && object.items.nok >= 0) {
            this.props.updateField({'totalOk': object.items.totalChecked - object.items.nok}, this.props.val);
        }


        //validation
        if (this.checkField(object.items)) {
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
                <td><Input type="text" className={this.state.partNumber} name="partNumber" placeholder="Enter number"
                           value={partNumber} onChange={this.handleInput.bind(this)}/></td>
                <td><Input type="text" className={this.state.totalChecked} name="totalChecked"
                           placeholder="Enter number" value={totalChecked} onChange={this.handleInput.bind(this)}/></td>
                <td><Input name="fromThisOk" placeholder={fromThisOk} value={fromThisOk} className="text-center"
                           readOnly/></td>
                <td><Input type="text" name="reworked" className={this.state.reworked} placeholder="Enter number"
                           value={reworked} onChange={this.handleInput.bind(this)}/></td>
                <td><Input type="text" name="nok" className={this.state.nok} placeholder="Enter number" value={nok}
                           onChange={this.handleInput.bind(this)}/></td>
                <td><Input name="totalOk" placeholder="0" value={totalOk} className="text-center" readOnly/></td>
                <td><Input type="text" name="remarks" className={this.state.remarks} value={remarks}
                           onChange={this.handleInput.bind(this)}/></td>
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