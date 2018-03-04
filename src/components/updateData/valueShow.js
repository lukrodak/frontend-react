import React, {Component} from 'react';
import _ from 'lodash';
import {Input, Button} from 'reactstrap';
import {connect} from 'react-redux';
import {updateOldField, addOldValidated, removeOldValidated, deleteOne} from '../../actions';

class ValueShow extends Component {

    state = {
        partNumber: '',
        totalChecked: '',
        reworked: '',
        nok: '',
        remarks: ''
    }

    checkField(items) {
        const {partNumber, totalChecked, reworked, nok, remarks} = items;
        let array = ['partNumber', 'totalChecked', 'reworked', 'nok', 'remarks'];

        if (String(partNumber).length > 0 && String(partNumber).length <= 10 && partNumber.match(/^[0-9a-z]+$/)) {
            this.setState({partNumber: ''});
            if (!_.findIndex(array, 'partNumber')) {
                array.push('partNumber');
            }
        } else {
            this.setState({partNumber: 'warning'});
            const index = _.findIndex(array, 'partNumber');
            array.splice(index, 1);
        }


        if (totalChecked.length > 0 && totalChecked.length <= 5 && Number.parseInt(totalChecked) >= Number.parseInt(reworked) && Number.parseInt(totalChecked) >= Number.parseInt(nok) && totalChecked.match(/^[0-9]+$/)) {
            this.setState({totalChecked: ''});
            if (!_.findIndex(array, 'totalChecked')) {
                array.push('totalChecked');
            }
        } else {
            this.setState({totalChecked: 'warning'});
            const index = _.findIndex(array, 'totalChecked');
            array.splice(index, 1);
        }

        if (reworked.length > 0 && reworked.length <= 5 && Number.parseInt(reworked) <= Number.parseInt(totalChecked) && reworked.match(/^[0-9]+$/)) {
            this.setState({reworked: ''});
            if (!_.findIndex(array, 'reworked')) {
                array.push('reworked');
            }
        } else {
            this.setState({reworked: 'warning'});
            const index = _.findIndex(array, 'reworked');
            array.splice(index, 1);
        }

        if (nok.length > 0 && nok.length <= 5 && Number.parseInt(nok) <= Number.parseInt(totalChecked) && nok.match(/^[0-9]+$/)) {
            this.setState({nok: ''});
            if (!_.findIndex(array, 'nok')) {
                array.push('nok');
            }
        } else {
            this.setState({nok: 'warning'});
            const index = _.findIndex(array, 'nok');
            array.splice(index, 1);
        }

        if (remarks.length > 0 && remarks.length <= 30 && partNumber.match(/^[0-9a-z]+$/)) {
            this.setState({remarks: ''});
            if (!_.findIndex(array, 'remarks')) {
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
        const target = e.target;
        const value = e.target.value;
        const name = target.name;
        const _id = this.props.val;
        const object = _.find(this.props.data, {_id});

        this.props.updateOldField({[name]: value}, _id);

        //calculate 'fromThisOk'
        if (object.totalChecked >= 0 && object.reworked >= 0 && object.nok >= 0) {
            this.props.updateOldField({'fromThisOk': object.totalChecked - object.reworked - object.nok}, this.props.val);
        }

        //calculate 'totalOk'
        if (object.totalChecked >= 0 && object.nok >= 0) {
            this.props.updateOldField({'totalOk': object.totalChecked - object.nok}, this.props.val);
        }

        //validation
        if (this.checkField(object)) {
            this.props.addOldValidated(_id);
        } else {
            this.props.removeOldValidated(_id);
        }

        this.props.update();
    }

    render() {

        const {partNumber, totalChecked, reworked, nok, remarks, fromThisOk, totalOk, _id} = this.props;

        return (
            <tr>
                <td><Input type="text" name="partNumber" className={this.state.partNumber} placeholder="Part no"
                           value={partNumber} onChange={this.handleInput.bind(this)}/></td>
                <td><Input type="text" name="totalChecked" className={this.state.totalChecked}
                           placeholder="Enter number" value={totalChecked} onChange={this.handleInput.bind(this)}/></td>
                <td><Input name="fromThisOk" placeholder="0" value={fromThisOk} className="text-center" readOnly/></td>
                <td><Input type="text" name="reworked" className={this.state.reworked} placeholder="Enter number"
                           value={reworked} onChange={this.handleInput.bind(this)}/></td>
                <td><Input type="text" name="nok" className={this.state.nok} placeholder="Enter number" value={nok}
                           onChange={this.handleInput.bind(this)}/></td>
                <td><Input name="totalOk" placeholder="0" value={totalOk} className="text-center" readOnly/></td>
                <td><Input type="text" name="remarks" className={this.state.remarks} value={remarks}
                           onChange={this.handleInput.bind(this)}/></td>
                <td><Button color="danger" onClick={() => this.props.deleteOne(_id)}>-</Button></td>
            </tr>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        data: state.data.data
    };
};

export default connect(mapStateToProps, {updateOldField, addOldValidated, removeOldValidated, deleteOne})(ValueShow);