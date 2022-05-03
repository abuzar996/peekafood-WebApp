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
import IntlMessages from "../../../../helpers/IntlMessages";
import { NotificationManager } from "../../../../components/common/react-notifications";

class TaxModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tax: ""
    };
  }

  toggleModal = () => {
    this.setState(
      {
        tax: ""
      },
      () => this.props.toggleModal()
    );
  };
  UNSAFE_componentWillReceiveProps(props) {
    if (props.modalOpen === true && this.state.tax === "")
      this.setState({
        tax: props.branch.tax_amount
      });
  }
  _onTaxChange = e => {
    this.setState({
      tax: e.target.value
    });
  };
  _onSubmit = e => {
    if (this.state.tax !== "") {
      let obj = {
        branch_id: this.props.branch.id,
        tax_amount: this.state.tax
      };
      this.props.addTax(obj);
      this.toggleModal();
    } else {
      NotificationManager.error(
        "Tax Amount is must",
        "Input Error",
        3000,
        null,
        null
      );
    }
  };
  render() {
    return (
      <Modal
        isOpen={this.props.modalOpen}
        toggle={this.props.toggleModal}
        wrapClassName="modal-top"
      >
        <ModalHeader toggle={this.props.toggleModal}>Add Tax (GST)</ModalHeader>
        <ModalBody>
          <Label className="mt-2">Tax-GST (%)</Label>
          <Input
            type="text"
            name="tax"
            id="branchTax"
            value={this.state.tax}
            onChange={this._onTaxChange}
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

export default TaxModal;
