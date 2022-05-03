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
      name: "",
      imagePreview: require("../../../../assets/css/sass/img/add_image.png"),
      image: "",
      description: ""
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
  _onNameChange = e => {
    this.setState({
      name: e.target.value
    });
  };
  _onDescriptionChange = e => {
    this.setState({
      description: e.target.value
    });
  };
  toggleModal = () => {
    this.setState({
      name: "",
      imagePreview: require("../../../../assets/css/sass/img/add_image.png"),
      image: "",
      description: ""
    });
    this.props.toggleModal();
  };
  _onSubmit = () => {
    if (
      this.state.name === "" ||
      this.state.image === "" ||
      this.state.description === ""
    ) {
      NotificationManager.error(
        "Name,Image,Description are must",
        "Input Error",
        4000,
        null,
        null
      );
    } else {
      let formData = new FormData();
      formData.append("restaurant_id", this.props.restaurant.id);
      formData.append("name", this.state.name);
      formData.append("category_image", this.state.image);
      formData.append("description", this.state.description);
      this.props.addCategory(formData);
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
        <ModalHeader toggle={this.props.toggleModal}>
          Add New Category
        </ModalHeader>
        <ModalBody>
          <label  htmlFor="fileupload">
            <img
              className="modalImage"
              alt="addCatergory"
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
          <Label className="mt-3 d-flex">
            Category Title<div style={{ color: "red" }}> *</div>
          </Label>
          <Input
            type="text"
            name="name"
            id="productName"
            value={this.state.name}
            onChange={this._onNameChange}
          />

          <Label className="mt-3 d-flex">
            <IntlMessages id="pages.description" />
            <div style={{ color: "red" }}> *</div>
          </Label>
          <Input
            type="textarea"
            name="text"
            id="description"
            value={this.state.description}
            onChange={this._onDescriptionChange}
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
