import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormText,
  FormGroup
} from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";
import _ from "lodash";

class RestaurantModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      strn:"",
      name: "",
      phoneNumber: "",
      email: "",
      facebookLink: "",
      imagePreview: require("../../assets/css/sass/img/add_image.png"),
      image: "",
      createdBy: "",
      accountString: "",
      description: "",
      address: ""
    };
  }
  
  UNSAFE_componentWillReceiveProps(props) {

      if (props.modalOpen === true) {
        this.setState({ createdBy: props.restaurant.created_by });
        if (this.state.name === "") {
          this.setState({ name: props.restaurant.name });
        }
        if (this.state.phoneNumber === "") {
          this.setState({ phoneNumber: props.restaurant.phone_number });
        }
        if (!_.isEmpty(props.restaurant.RESTAURANT_IMAGES))
          this.setState({
            imagePreview: props.restaurant.RESTAURANT_IMAGES[0].restaurant_image
          });
        else
          this.setState({
            imagePreview: require("../../assets/css/sass/img/add_image.png")
          });
        if (this.state.accountString === "") {
          this.setState({ accountString: props.restaurant.account_string });
        }
        if (this.state.description === "") {
          this.setState({ description: props.restaurant.description });
        }
        if(this.state.strn==="")
        {
          this.setState({strn:props.restaurant.strn});
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
  onSubmit = () => {
    let formData = new FormData();
    formData.append("restaurant_id", this.props.restaurant.id);
    formData.append("name", this.state.name);
    formData.append("phone_number", this.state.phoneNumber);
    formData.append("description", this.state.description);
    formData.append("strn",this.state.strn);
    if (!_.isEmpty(this.state.image)){
    formData.append("restaurant_image", this.state.image);
    }
    
    this.props.editRestaurant(formData);
    this.toggleModal();
  };
  toggleModal = () => {
    this.setState(
      {
        strn:"",
        name: "",
        phoneNumber: "",
        email: "",
        facebookLink: "",
        imagePreview: "",
        image: "",
        createdBy: "",
        accountString: "",
        description: "",
        address: ""
      },
      () => this.props.toggleModal()
    );
  };
  render() {
    return (
      <Modal
        isOpen={this.props.modalOpen}
        toggle={this.props.toggleModal}
        wrapClassName="modal-top"
      >
        <ModalHeader toggle={this.props.toggleModal}>
          Edit Restaurant Info
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <div
                style={{
                  float: "right",
                  alignItems: "center",
                  width: "55%"
                }}
              >
                <Label for="fileupload">
                  <img
                    className="modalImage"
                    alt="addDish"
                    src={this.state.imagePreview}
                  />
                </Label>
                <Input
                  className="modalButton"
                  id="fileupload"
                  type="file"
                  accept="image/jpeg, image/jpg, image/gif, image/png"
                  required
                  onChange={this._onImageChange}
                />
                <FormText color="muted"
                className="modalImage">
                            Upload your image in .jpg/.png format. Size
                            shouldn't be more than 3MB.
                </FormText>
              </div>

              <div style={{ width: "45%" }}>
                <Label className="d-flex">
                  <div>
                    <strong>Created By: </strong>
                  </div>
                  <div className="ml-2">{this.state.createdBy}</div>
                </Label>
                <Label className="d-flex">
                  Business Name <div style={{ color: "red" }}> *</div>
                </Label>

                <Input
                  type="text"
                  name="restaurant_name"
                  placeholder={"Enter Restaurant Name"}
                  value={this.state.name}
                  onChange={e => {
                    this.setState({ name: e.target.value });
                  }}
                />

                <Label className="mt-1 d-flex">
                  Business Account ID
                  <div style={{ color: "red" }}> *</div>{" "}
                </Label>
                <Input
                  type="text"
                  name="restaurant_account_string"
                  placeholder={"Enter Unique Identifier"}
                  disabled
                  value={this.state.accountString}
                  onChange={e => {
                    this.setState({
                      accountString: e.target.value
                    });
                  }}
                />
                <Label className="mt-1 d-flex">
                  Business STRN
                  <div style={{ color: "red" }}> *</div>{" "}
                </Label>
                <Input
                  type="text"
                  name="restaurant_STRN_string"
                  placeholder={"Enter Unique Identifier"}
                  value={this.state.strn}
                  onChange={e => {
                    this.setState({
                      strn: e.target.value
                    });
                  }}
                />
              </div>
              <Label className="mt-3 d-flex">
                Business Phone Number
                <div style={{ color: "red" }}> *</div>
              </Label>
              <Input
                type="tel"
                name="restaurant_phone_number"
                placeholder={"Enter Phone Number"}
                value={this.state.phoneNumber}
                onChange={e => {
                  this.setState({
                    phoneNumber: e.target.value
                  });
                }}
              />
              <Label className="mt-1">Business Tagline</Label>
              <Input
                type="textarea"
                placeholder={"Enter Restaurant Tagline"}
                value={this.state.description}
                onChange={e => {
                  this.setState({
                    description: e.target.value
                  });
                }}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline onClick={this.props.toggleModal}>
            <IntlMessages id="pages.cancel" />
          </Button>
          <Button
            color="primary"
            disabled={
              localStorage.getItem("role") === "RESTAURANT_OWNER" ? false : true
            }
            onClick={this.onSubmit}
          >
            Edit
          </Button>{" "}
        </ModalFooter>
      </Modal>
    );
  }
}

export default RestaurantModal;
