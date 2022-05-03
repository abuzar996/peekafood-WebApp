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
import _ from "lodash";
import Select from "react-select";

class EditModal extends Component {
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
      id: "",
      branch: "",
      branches: [],
      branchId: 0,
      boolAssign: false,
      boolUnassign: false,
      send: false,
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
      this.state.email !== ""
    ) {
      let formData = new FormData();
      formData.append("username", this.state.username);
      formData.append("first_name", this.state.firstName);
      formData.append("last_name", this.state.lastName);
      if (this.state.image !== "")
        formData.append("profile_image", this.state.image);
      formData.append("contact_email", this.state.email);
      formData.append("phone_number", this.state.phoneNumber);
      formData.append("manager_id", this.state.id);
      if (!_.isEmpty(this.state.password))
        formData.append("password", this.state.password);
      if (this.state.send === true)
        formData.append("manager_branch_id", this.state.branchId);
      formData.append("account_string", this.props.restaurant.account_string);
      this.props.editManager(formData);
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
        password: "",
        id: "",
        branch: "",
        branches: [],
        branchId: 0,
        boolAssign: false,
        boolUnassign: false,
        send: false
      },
      () => this.props.toggleModal()
    );
  };
  UNSAFE_componentWillReceiveProps(props) {
    if (props.data.contact_email !== this.state.email) {
      this.setState({
        firstName: props.data.first_name,
        lastName: props.data.last_name,
        image: "",
        username: props.data.username,
        email: props.data.contact_email,
        phoneNumber: props.data.phone_number,
        password: props.data.password,
        
        id: props.data.id,
        branch: props.data.branch_name,
        branches: props.branches.map(function (branch) {
          return { value: branch.id, label: branch.branch_name };
        })
      });
      if (!_.isEmpty(props.data.profile_image))
        this.setState({
          imagePreview: props.data.profile_image
        });
      else
        this.setState({
          imagePreview: require("../../../../assets/css/sass/img/add_image.png")
        });
      if (_.isEmpty(props.data.branch_name)) {
        this.setState({ boolUnassign: false, boolAssign: true });
      } else {
        this.setState({ boolUnassign: true, boolAssign: false });
      }
    }
  }
  _onBranchesChange = branch => {
    this.setState({
      branch: branch.label,
      branchId: branch.value,
      boolAssign: true
    });
  };
  render() {
    return (
      <Modal
        isOpen={this.props.editModalOpen}
        toggle={this.props.toggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={this.toggleModal}>
          Edit / Delete Manager
        </ModalHeader>
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
            name="email"
            disabled
            id="email"
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <Label className="mt-4 d-flex">
            (AccountString).(Username)<div style={{ color: "red" }}> *</div>
          </Label>
          <Input
            type="text"
            name="usernames"
            id="usernames"
            value={this.state.username}
            onChange={e => this.setState({ username: e.target.value })}
          />
          <Label className="mt-4 d-flex">
            Password<div style={{ color: "red" }}> *</div>
          </Label>
          <Input
            type="password"
            name="password"
            id="password"
            value={this.state.password ||''}
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
          <Label className="mt-4">Branch Assign/UnAssign</Label>

          {this.state.boolUnassign === true ? (
            <Button
              color="link"
              disabled={this.state.send}
              onClick={() =>
                this.setState(
                  { branchId: 0, boolUnassign: false, send: true },
                  () =>
                    NotificationManager.success(
                      "Click submit to save changes",
                      "Unassigning Manager",
                      4000,
                      null,
                      null
                    )
                )
              }
            >
              -UnAssign Branch
            </Button>
          ) : null}
          {this.state.boolAssign === true ? (
            <div>
              <Select
                className="react-select"
                classNamePrefix="react-select"
                name="form-field-name"
                placeholder={this.state.branch || "Select..."}
                options={this.state.branches}
                value={this.state.branch}
                onChange={this._onBranchesChange}
              />
              {this.state.branchId !== "" ? (
                <Button
                  color="link"
                  disabled={this.state.send}
                  onClick={() =>
                    this.setState({ send: true }, () =>
                      NotificationManager.success(
                        "Click submit to save changes",
                        "Assigning Branch to Manager",
                        4000,
                        null,
                        null
                      )
                    )
                  }
                >
                  +Assign Branch
                </Button>
              ) : null}
            </div>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              let x = window.confirm(
                "Are you sure you want to delete Manager?"
              );
              if (x === true) {
                this.props.deleteManager(this.props.data.id);
                return this.toggleModal();
              } else {
                return this.toggleModal();
              }
            }}
          >
            <IntlMessages id="pages.delete" />
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

export default EditModal;
