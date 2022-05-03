import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Label
} from "reactstrap";
import Select from "react-select";
import IntlMessages from "../../../../helpers/IntlMessages";
import { NotificationManager } from "../../../../components/common/react-notifications";
import _ from 'lodash'

class AddNewModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            units: [{ value: 'Weight(kg)', label: 'Weight(kg)' }, { value: 'Volume(L)', label: 'Volume(L)' }, { value: 'Quantity(Pc)', label: 'Quantity(Pc)' }],
            selectedUnit: {},
            quantity: "",
            threshold: "",
            price_per_unit: ""
        };
    }

    _onNameChange = e => {
        this.setState({
            name: e.target.value
        });
    };
    _onQuantityChange = e => {
        this.setState({
            quantity: e.target.value
        });
    };
    _onAddUnit = e => {
        this.setState({
            selectedUnit: e
        });
    };
    toggleModal = () => {
        this.setState({
            name: "",
            units: [{ value: 'Weight(kg)', label: 'Weight(kg)' }, { value: 'Volume(L)', label: 'Volume(L)' }, { value: 'Quantity(Pc)', label: 'Quantity(Pc)' }],
            selectedUnit: {},
            quantity: "",
            threshold: "",
            price_per_unit: ""

        });
        this.props.toggleModal();
    };
    _onSubmit = () => {

        if (
            this.state.price_per_unit==="" ||
            this.state.threshold === "" ||
            this.state.name === ""
            || this.state.quantity === "" ||
            _.isEmpty(this.state.selectedUnit)

        ) {
            NotificationManager.error(
                "All fields are must",
                "Input Error",
                4000,
                null,
                null
            );
        } else {
            let obj = {
                "branch_id": this.props.branch.id,
                "item_name": this.state.name,
                "unit": this.state.selectedUnit.value,
                "quantity": this.state.quantity,
                "threshold": this.state.threshold,
                "price_per_unit": this.state.price_per_unit
            };
            this.props.addInventory(obj);
            this.toggleModal();
        }
    };

    render() {
        return (
            <Modal
                isOpen={this.props.modalOpen}
                toggle={this.props.toggleModal}
                wrapClassName="modal-top">
                <ModalHeader toggle={this.props.toggleModal}>
                    Add Inventory Item
        </ModalHeader>
                <ModalBody>

                    <Label className="mt-3 d-flex">
                        Item Name<div style={{ color: "red" }}> *</div>
                    </Label>
                    <Input
                        type="text"
                        name="name"
                        id="productName"
                        value={this.state.name}
                        onChange={this._onNameChange}
                    />
                    <Label className="mt-3 d-flex">
                        Unit
                        <div style={{ color: "red" }}> *</div>
                    </Label>
                    <Select
                        placeholder={"Select Unit in Kilogram(s),Liter(s),Piece(s)"}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="unitselect"
                        isSearchable
                        options={this.state.units}
                        onChange={(...args) => this._onAddUnit(...args)}
                    />

                    <Label className="mt-3 d-flex">
                        Quantity
                        <div style={{ color: "red" }}> *</div>
                    </Label>
                    <Input
                        type="number"
                        name="num"
                        id="num"
                        value={this.state.quantity}
                        onChange={this._onQuantityChange}
                    />
                    <Label className="mt-3 d-flex">
                        Threshold
                        <div style={{ color: "red" }}> *</div>
                    </Label>
                    <Input
                        type="number"
                        value={this.state.threshold}
                        onChange={e => {
                            this.setState({ threshold: e.target.value })
                        }}
                    
                    />
                    <Label className="mt-3 d-flex">
                        Price Per unit
                        <div style={{ color: "red" }}> *</div>
                    </Label>
                    <Input
                        type="number"
                        value={this.state.price_per_unit}
                        onChange={e => {
                            this.setState({ price_per_unit: e.target.value })
                        }}
                        />
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" outline onClick={this.toggleModal}>
                        <IntlMessages id="pages.cancel" />
                    </Button>
                    <Button color="primary" onClick={this._onSubmit}>
                        <IntlMessages id="pages.submit" />
                    </Button>{" "}
                </ModalFooter>
            </Modal>
        );
    }
}

export default AddNewModal;
