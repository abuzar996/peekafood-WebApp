import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Spinner
} from "reactstrap";
import Select from "react-select";
import IntlMessages from "../../../../helpers/IntlMessages";
import axios from 'axios';
import { BASE_URL } from "../../../../API";
import _ from "lodash"
class EditInventoryModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inventory: [],
            flag: true
        };
    }
    UNSAFE_componentWillReceiveProps(props) {
        if (props.inventoryModal === true && _.isEmpty(this.state.inventory) && this.state.flag === true) {
            try {
                axios
                    .get(`${BASE_URL}/api/dish/itemusage`, {
                        params: {
                            dish_id: this.props.dish.id
                        },
                        headers: {
                            Authorization: "token " + localStorage.getItem("tokenId"),

                        }
                    })
                    .then(response => this.setState({ inventory: response.data, flag: false }))
                    .catch(error => this.setState({ inventory: [], flag: false }));
            } catch (error) {
                console.log("error : ", error);
            }
        }
    }
    addInventory = () => {
        let obj = {
            item_name: "",
            item_id: 0,
            unit: "",
            unit_consumed: 0
        }
        let inventory = this.state.inventory;
        inventory.push(obj);
        this.setState({
            ...inventory
        });

    }
    _onItemSelect = (id, value) => {

        const setItem = this.state.inventory.map((n, sidx) => {
            if (id !== sidx) return n;
            return { ...n, item_name: value.item_name, unit: value.unit, item_id: value.id };
        });
        this.setState({ inventory: setItem });
    }
    _onUnitConsumedChange = (id) => e => {

        let inventory = this.state.inventory;
        let newInventory = this.state.inventory[id];
        newInventory.unit_consumed = e.target.value;
        inventory[id] = newInventory;
        this.setState({ ...inventory });
    }
    toggleModal = () => {
        this.setState({
            inventory: [],
            flag: true
        }, () => this.props.toggleInventoryModal())
    }
    handleRemoveInventory = (id) => {

        this.setState({
            inventory: this.state.inventory.filter((s, sidx) => id !== sidx)
        });
    }
    _onSubmit = () => {
        try {
            axios
                .patch(`${BASE_URL}/api/dish/itemusage`, { dish_id: this.props.dish.id, inventory: this.state.inventory }, {

                    headers: {
                        Authorization: "token " + localStorage.getItem("tokenId"),

                    }
                })
                .then(response => response)
                .catch(error => error.response);
        } catch (error) {
            console.log("error : ", error);
        }
        this.toggleModal();
    }
    render() {
        return (<Modal
            isOpen={this.props.inventoryModal}
            toggle={this.props.toggleInventoryModal}
            wrapClassName="modal-top"
        >
            <ModalHeader toggle={this.props.toggleInventoryModal}>
                Edit Inventory
            </ModalHeader>
            {this.state.flag === false ?
                <ModalBody>


                    <Button
                        className="float-right mb-4"
                        color="primary"
                        outline
                        onClick={this.addInventory}
                    >
                        Add Item
                </Button>
                    <br />
                    <br />
                    <br />
                    <div className="mt-4">
                        {this.state.inventory.map((item, i) => <div key={i} className="d-flex justify-content-center align-self-stretch flex-wrap mt-2">
                            <div className="flex-fill">
                                <Select
                                    id={i}
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    options={this.props.allInventory}
                                    placeholder={"Select..."}
                                    value={item}
                                    getOptionLabel={option => `${option.item_name}`}
                                    getOptionValue={option => `${option.item_name} ${option.unit} ${option.id}`}
                                    onChange={value => this._onItemSelect(i, value)}
                                />
                            </div>
                            <b>{item.item_name === "" ?
                        <div></div>
                        :
                        <div >
                        <div id={i} className="d-flex justify-content-center" ><Input style={{ width: "85px" }} readOnly="readonly" value={item.unit}></Input>
                        <div className="d-flex justify-content-center"> <Input id={i} type="number" disabled={item.item_name === ""} value={item.unit_consumed} onChange={this._onUnitConsumedChange(i)} /></div></div>
                        </div>  
                        }</b>
                            <Button id={i} color="link" onClick={() => this.handleRemoveInventory(i)}>
                                X
                </Button>

                        </div>)}
                    </div>

                </ModalBody> :
                <ModalBody>
                    <Spinner className='d-flex justify-content-center' color='primary' />
                </ModalBody>
            }
            <ModalFooter>
                <Button color="secondary" outline onClick={this.toggleModal}>
                    <IntlMessages id="pages.cancel" />
                </Button>
                <Button color="primary" onClick={this._onSubmit}>
                    <IntlMessages id="pages.submit" />
                </Button>{" "}
            </ModalFooter>
        </Modal>)
    }
}
export default EditInventoryModal;