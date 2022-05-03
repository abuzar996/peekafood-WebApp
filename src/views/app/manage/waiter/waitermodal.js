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

class WaiterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      phoneNumber: "",
      password: "",
      regexp: /^[0-9\b]+$/
    };
  }

  toggleModal = () => {
    this.setState({
      firstName: "",
      lastName: "",
      username: "",
      phoneNumber: "",
      password: ""
    });
    this.props.toggleModal();
  };
  _onSubmit = () => {
    if (this.state.firstName === "" || this.state.password === "") {
      NotificationManager.error(
        "Name and password Fields are must",
        "Input Error",
        3000,
        null,
        null
      );
    } else {
      let object = {
        branch_id: this.props.branch.id,
        first_name: this.state.firstName,
        last_name: this.state.lastName,

        password: this.state.password,
        phone_number: this.state.phoneNumber,
        account_string: this.props.restaurant.account_string
      };
      this.props.addWaiter(object);
      this.toggleModal();
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.modalOpen}
        toggle={this.props.toggleModal}
        wrapClassName="modal-right"
      >
        <ModalHeader toggle={this.props.toggleModal}>Add Server</ModalHeader>
        <ModalBody>
          <Label className="mt-4 d-flex">
            First Name<div style={{ color: "red" }}> *</div>
          </Label>
          <Input
            type="text"
            name="fname"
            id="firstName"
            value={this.state.firstName}
            onChange={e => this.setState({ firstName: e.target.value })}
          />
          <Label className="mt-4">Last Name</Label>
          <Input
            type="text"
            name="lname"
            id="lastName"
            value={this.state.lastName}
            onChange={e => this.setState({ lastName: e.target.value })}
          />
          {/* <Label className="mt-4 d-flex">
            Username<div style={{ color: "red" }}> *</div>
          </Label>
          <Input
            type="text"
            value={this.state.username}
            onChange={e => this.setState({ username: e.target.value })}
          /> */}
          <Label className="mt-4">Account ID</Label>
          <Input
            type="text"
            name="account"
            id="account"
            disabled={true}
            value={this.props.restaurant.account_string}
          />
          <Label className="mt-4">Phone Number</Label>
          <Input
            type="tel"
            value={this.state.phoneNumber}
            onChange={e => {
              let phone = e.target.value;
              if (phone === "" || this.state.regexp.test(phone))
                this.setState({ phoneNumber: phone })
            }}
          />
          <Label className="mt-4 d-flex">
            Password<div style={{ color: "red" }}> *</div>
          </Label>
          <Input
            type="password"
            value={this.state.password}
            onChange={e => {
              e.preventDefault();
              this.setState({ password: e.target.value });
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
export default WaiterModal;
