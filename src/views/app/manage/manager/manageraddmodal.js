import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormText,
  Label
} from "reactstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import { NotificationManager } from "../../../../components/common/react-notifications";

class AddNewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      imagePreview: require("../../../../assets/css/sass/img/add_image.png"),
      image: "",
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
      regexp: /^[0-9\b]+$/
    };
  }
  _onImageChange = e => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onloadend = e => {
      this.setState({
        imagePreview: [reader.result]
      });
    };
    this.setState({
      image: e.target.files[0]
    });
  };

  _onSubmit = e => {
    e.preventDefault();
    if (
      this.state.firstName !== "" &&
      this.state.username !== "" &&
      this.state.email !== "" &&
      this.state.password !== ""
    ) {
      let formData = new FormData();
      formData.append("username", this.state.username);
      formData.append("first_name", this.state.firstName);
      formData.append("last_name", this.state.lastName);
      if (this.state.image !== "")
        formData.append("profile_image", this.state.image);
      formData.append("contact_email", this.state.email);
      formData.append("phone_number", this.state.phoneNumber);
      formData.append("password", this.state.password);
      formData.append("account_string", this.props.restaurant.account_string);
      this.props.addManager(formData);
      this.toggleModal();
    } else {
      NotificationManager.error(
        "Name, email, password and username are must",
        "Input Error",
        4000,
        null,
        null
      );
    }
  };
  toggleModal = () => {
    this.setState(
      {
        firstName: "",
        lastName: "",
        imagePreview: require("../../../../assets/css/sass/img/add_image.png"),
        image: "",
        username: "",
        email: "",
        phoneNumber: "",
        password: ""
      },
      () => this.props.toggleModal()
    );
  };
  render() {
    return (
      <Modal
        isOpen={this.props.modalOpen}
        toggle={this.props.toggleModal}
        wrapClassName="modal-right"
      >
        <ModalHeader toggle={this.props.toggleModal}>Add Manager</ModalHeader>
        <ModalBody>
          <label htmlFor="fileupload">
            <img
              className="modalImage"
              alt="addDish"
              src={this.state.imagePreview}
            />
          </label>

          <input
            className="modalButton"
            id="fileupload"
            type="file"
            accept="image/jpeg, image/jpg, image/gif, image/png"
            onChange={this._onImageChange}
          />
          <FormText color="muted">
                            Upload your image in .jpg/.png format. Size
                            shouldn't be more than 3MB.
          </FormText>
          <Label className="mt-4 d-flex">
            First Name<div style={{ color: "red" }}> *</div>
          </Label>
          <Input
            type="text"
            name="name"
            value={this.state.firstName}
            onChange={e => this.setState({ firstName: e.target.value })}
          />
          <Label className="mt-4">Last Name</Label>
          <Input
            type="text"
            name="name1"
            value={this.state.lastName}
            onChange={e => this.setState({ lastName: e.target.value })}
          />

          <Label className="mt-4 d-flex">
            Email Address<div style={{ color: "red" }}> *</div>
          </Label>
          <Input
            type="email"
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <Label className="mt-4 d-flex">
            Username<div style={{ color: "red" }}> *</div>
          </Label>
          <Input
            type="text"
            value={this.state.username}
            onChange={e => this.setState({ username: e.target.value })}
          />
          <Label className="mt-4 d-flex">
            Password<div style={{ color: "red" }}> *</div>
          </Label>
          <Input
            type="password"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />
          <Label className="mt-4">Account ID</Label>
          <Input
            type="text"
            name="username"
            id="username"
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
