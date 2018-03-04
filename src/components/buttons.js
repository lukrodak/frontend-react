import React, {Component} from 'react';
import {Col, Row, Button} from 'reactstrap';

class Buttons extends Component {
    state = {
        addButtonClicked: false,
        showRemoveButton: false,
        addRows: 0
    }

    saveButtonAction() {
        this.setState({addRows: 0, showRemoveButton: false});
        this.props.save();
    }

    addButtonAction() {
        this.props.addRow();

        this.setState({
            addButtonClicked: true,
            showRemoveButton: true
        });

        this.setState((prevState) => {
            return {addRows: prevState.addRows + 1};
        }, () => {
            this.props.update();
        });

        this.props.disable();
    }

    removeButtonAction() {
        this.setState((prevState) => {
            return {addRows: prevState.addRows - 1};
        }, () => {
            this.props.update();
        });

        if (this.state.addRows === 1) {
            this.setState({showRemoveButton: false});
        }
        this.props.remove();
        this.props.removeRow();

    }

    render() {
        return (
            <Row className="mb-5 mt-5">
                <Col>
                    <div className="float-left">
                        <Button color="success addButton" onClick={this.addButtonAction.bind(this)}>+</Button>
                    </div>

                    <div>
                        {this.state.showRemoveButton ?
                            <div className="float-left ml-2">
                                <Button color="danger addButton" onClick={this.removeButtonAction.bind(this)}>-</Button>
                            </div>
                            :
                            null
                        }
                        <Col>
                            <div className="float-right">
                                <Button color="primary saveButton" onClick={this.saveButtonAction.bind(this)}
                                        disabled={this.props.disabled}>Save</Button>
                            </div>
                        </Col>
                    </div>
                </Col>
            </Row>
        );
    }
};

export default Buttons;