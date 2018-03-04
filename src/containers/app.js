import React, {Component} from 'react';
import '../style/style.css';
import 'bootstrap/dist/css/bootstrap.css';

import {SyncLoader} from 'react-spinners';
import {Container, Table} from 'reactstrap';
import {connect} from 'react-redux';
import {
    getDataFromDB,
    addRow,
    removeRow,
    saveToDB,
    disableField,
    enableField,
    removeLast,
    saveUpdatedDataToDB
} from '../actions';

import Header from '../components/header';
import ValuesList from '../components/saveNewData/valuesList';
import ValuesListShow from '../components/updateData/valuesListShow';
import Buttons from '../components/buttons';
import Total from '../components/total';


class App extends Component {

    componentDidMount() {
        this.props.getDataFromDB();
    }

    checkIfAddable() {
        if (this.props.dataToSave.length === 0 && this.props.data.length === 0) {
            return false;
        }

        for (let i = 0; i < this.props.dataToSave.length; i++) {
            if (this.props.dataToSave[i].items.partNumber.length === 0 ||
                this.props.dataToSave[i].items.totalChecked.length === 0 ||
                this.props.dataToSave[i].items.reworked.length === 0 ||
                this.props.dataToSave[i].items.partNumber.nok === 0) {
                return false;
            }
        }
        return true;
    }


    updateComponent() {
        if (this.checkIfAddable() && (this.props.validationOld.updated.length === this.props.validationOld.validatedOld.length) && (this.props.validationNew.validated.length === this.props.validationNew.dataToSave.length)) {
            this.props.enableField();
        } else {
            this.props.disableField();
        }
    }

    saveData() {
        const newData = this.props.dataToSave;
        const updatedData = this.props.updated;
        this.props.saveToDB(newData);
        this.props.saveUpdatedDataToDB(updatedData);
    }

    disableButton() {
        this.props.disableField();
    }

    remove() {
        const index = this.props.dataToSave.length;
        const id = this.props.dataToSave[index - 1]._id;
        this.props.removeLast(id);
        if (this.props.validationNew.validated.length === 0) {
            this.props.disableField();
        }

    };

    render() {
        return (
            <div className="mt-5 d-flex">
                <Container className="border rounded">
                    {this.props.fetchErrors ? <h5 className="text-center mt-5">{this.props.fetchErrors}</h5> : null}
                    <div className="d-flex justify-content-center">
                        <SyncLoader
                            color={'#5cb85c'}
                            loading={this.props.loading}
                        />
                    </div>
                    <Table className="mt-5">
                        <Header/>
                        {this.props.data ?
                            <ValuesListShow
                                data={this.props.data}
                                update={this.updateComponent.bind(this)}
                            />
                            : null}
                        {this.props.dataToSave ?
                            <ValuesList
                                data={this.props.dataToSave}
                                update={this.updateComponent.bind(this)}
                            />
                            : null}
                        {this.props.data ?
                            <Total
                                data={this.props.data}
                                dataToSave={this.props.dataToSave}
                            />
                            : null}
                    </Table>
                    <Buttons
                        addRow={this.props.addRow}
                        removeRow={this.props.removeRow}
                        update={this.updateComponent.bind(this)}
                        save={this.saveData.bind(this)}
                        disable={this.disableButton.bind(this)}
                        disabled={this.props.disabledSaving}
                        remove={this.remove.bind(this)}
                    />
                </Container>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        data: state.data.data,
        dataToSave: state.dataToSave.dataToSave,
        disabledSaving: state.dataToSave.disabled,
        validationNew: state.dataToSave,
        validationOld: state.data,
        updated: state.data.updated,
        fetchErrors: state.data.error,
        loading: state.data.loading
    };
};

export default connect(mapStateToProps, {
    getDataFromDB,
    addRow,
    removeRow,
    saveToDB,
    enableField,
    disableField,
    removeLast,
    saveUpdatedDataToDB
})(App);