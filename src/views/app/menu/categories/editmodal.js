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

class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imagePreview: require("../../../../assets/css/sass/img/add_image.png"),
      image: "",
      description: ""
    };
  }


  UNSAFE_componentWillReceiveProps(props) {
    if (props.data) {
      if(this.state.name==="" ||
      this.state.id===0 ||
      this.state.description==="")
      {
        this.setState({
          name: props.data.name,
          id: props.data.id,
          imagePreview: props.data.category_image,
          image: "",
          description: props.data.description
        });
      }
    }
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
      this.state.image !== "" ||
      this.state.name !== "" ||
      this.state.description !== ""
    ) {
      let formData = new FormData();
      formData.append("category_id", this.props.data.id);
      formData.append("name", this.state.name);
      formData.append("category_image", this.state.image);
      formData.append("description", this.state.description);
      
      this.props.editCategory(formData);
      this.toggleModal();
    } else {
      NotificationManager.error(
        "Name, Image, Description are must",
        "Input Error",
        4000,
        null,
        null
      );
    }
  };
  _onDelete = () => {
    let obj = { category_id: this.props.data.id };
    this.props.deleteCategory(obj);
    this.toggleModal();
  };
  render() {
    return (
      <Modal
        isOpen={this.props.modalOpen}
        toggle={this.props.toggleModal}
        wrapClassName="modal-right"
      >
        <ModalHeader toggle={this.props.toggleModal}>Edit Category</ModalHeader>
        <ModalBody>
          <label  htmlFor="fileupload">
            <img
              className="modalImage"
              alt="addCategory"
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
          <Button color="danger" onClick={this._onDelete}>
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

export default EditModal;
