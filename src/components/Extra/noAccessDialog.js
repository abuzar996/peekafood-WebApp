import React, { Component } from "react";
import {
    Link
   } from 'react-router-dom';
   
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Label
} from "reactstrap";


class NoAccess extends Component {
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
    _onSubmit=()=>{
        
    }
    render() {
        return (
            <Modal
                isOpen={this.props.modalOpen}
                toggle={this.props.toggleModal}
                wrapClassName="modal-top">
                <ModalHeader toggle={this.props.toggleModal}>
                    <span>{this.props.ModuleName}</span> Not Purchased
               </ModalHeader>
                <ModalBody style={{display:'flex',justifyContent:'center'}}>

                    <Label >
                       You cannot access <span>{this.props.ModuleName}</span> because you haven't Purchased that.
                       <br/>
                       <br/>
                       <Label style={{display:'flex',justifyContent:'center'}}>Click the Buy Module Button to continue.</Label>
                    </Label>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" outline onClick={this.props.toggleModal}>
                    <Link  to ="/app">Cancel</Link>
                        
                    </Button>
                    <Button color="primary" onClick={this._onSubmit}>
                       <Link style={{color:'#ffffff'}} to ="/app/billing-licensing">Buy this Module</Link>
                    </Button>{" "}
                </ModalFooter>
            </Modal>
        );
    }
}

export default NoAccess;
