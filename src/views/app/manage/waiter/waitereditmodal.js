import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  CustomInput
} from "reactstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import { NotificationManager } from "../../../../components/common/react-notifications";

class WaiterEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      phoneNumber: "",
      activated: true,
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
    if (this.state.firstName === "" || this.state.username === "") {
      NotificationManager.error(
        "Name and username field are must",
        "Input Error",
        3000,
        null,
        null
      );
    } else {
      if (this.state.password === "") {
        let object = {
          waiter_id: this.props.data.id,
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          phone_number: this.state.phoneNumber,
          account_string: this.props.restaurant.account_string
        };
        this.props.editWaiter(object);
        this.props.toggleModal();
      } else {
        let object = {
          waiter_id: this.props.data.id,
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          password: this.state.password,
          phone_number: this.state.phoneNumber,
          account_string: this.props.restaurant.account_string
        };
        this.props.editWaiter(object);
        this.props.toggleModal();
      }
    }
  };
  UNSAFE_componentWillReceiveProps(props) {
    if (props.data.username !== this.state.username) {
      this.setState({
        firstName: props.data.first_name,
        lastName: props.data.last_name,
        username: props.data.username,
        phoneNumber: props.data.phone_number,
        activated: props.data.activated,
        password: ""
      });
    }
  }

  render() {
    return (
      <Modal
        isOpen={this.props.modalOpen}
        toggle={this.props.toggleModal}
        wrapClassName="modal-right"
      >
        <ModalHeader toggle={this.props.toggleModal}>
          Edit/Delete Server
        </ModalHeader>
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
            name="username"
            disabled={true}
            id="username"
            value={this.state.username}
            onChange={e => this.setState({ username: e.target.value })}
          /> */}
          <Label className="mt-4">Account String</Label>
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
            name="phonenumber"
            id="phonenumber"
            value={this.state.phoneNumber}
            onChange={e => {
              let phone = e.target.value;
              if (phone === "" || this.state.regexp.test(phone))
                this.setState({ phoneNumber: phone })
            }}
          />
          <Label className="mt-4">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />
          <Label className="mt-4">Activate</Label>
          <CustomInput
            type="radio"
            id="exCustomRadio"
            name="customRadio"
            label="Yes"
            defaultChecked={this.state.activated === true}
            value={true}
            onChange={e =>
              this.setState({
                activated: e.target.value
              })
            }
          />
          <CustomInput
            type="radio"
            id="exCustomRadio2"
            name="customRadio"
            label="No"
            defaultChecked={this.state.activated === false}
            value={false}
            onChange={e =>
              this.setState({
                activated: e.target.value
              })
            }
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              this.props.deleteWaiter(this.props.data.id);
              this.props.toggleModal();
            }}
          >
            Delete
          </Button>
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
export default WaiterEditModal;
