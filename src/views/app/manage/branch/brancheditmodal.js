import React, { Component } from "react";
import 'date-fns';
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
import DishesImportModal from "./branchdishmodal";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import _ from "lodash";
import TaxModal from "./taxmodal";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import Map from "./map";

class BranchEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      strn:"",
      name: "",
      imagePreview: require("../../../../assets/css/sass/img/add_image.png"),
      image: "",
      address: "",
      phoneNumber: "",
      openTime: new Date("Mon Apr 20 2020 00:00:00"),
      closeTime: new Date("Mon Apr 20 2020 00:00:00"),
      dishesModal: false,
      seating: [],
      region: "",
      country: "",
      taxmodalOpen: false,
      regexp: /^[0-9\b]+$/,
      longitude: 69.3451,
      latitude: 30.3753,
      radius:0
    };
  }
  handleNewSeating = () => {
    this.setState({
      seating: this.state.seating.concat([{ section: "", table: "" }])
    });
  };
  _onAddSections = id => e => {
    const newName = this.state.seating.map((n, sidx) => {
      if (id !== sidx) return n;
      return { ...n, section: e.target.value };
    });
    this.setState({ seating: newName });
  };
  _onAddTables = id => e => {
    const newName = this.state.seating.map((n, sidx) => {
      if (id !== sidx) return n;
      return { ...n, table: e.target.value };
    });
    this.setState({ seating: newName });
  };
  handleRemoveSeating = id => () => {
    this.setState({
      seating: this.state.seating.filter((s, sidx) => id !== sidx)
    });
  };
  toggleDishesModal = () => {
    this.setState({
      dishesModal: !this.state.dishesModal
    });
  };
  toggleModal = () => {
    this.setState({
      strn:"",
      name: "",
      address: "",
      phoneNumber: "",
      openTime: new Date("Mon Apr 20 2020 00:00:00"),
      closeTime: new Date("Mon Apr 20 2020 00:00:00"),
      imagePreview: require("../../../../assets/css/sass/img/add_image.png"),
      image: "",
      seating: [],
      region: "",
      country: "",  
      longitude: 69.3451,
      latitude: 30.3753,
      radius:0
    }, () => this.props.toggleModal());

  };
  setPosition = (position) => {
    this.setState({
      longitude: position.lng,
      latitude: position.lat,
      
    })
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
      this.state.branch_name === "" ||
      this.state.phoneNumber === "" ||
      this.state.openTime === "" ||
      this.state.closeTime === "" ||
      this.state.address === "" ||
      this.state.strn === "" ||
      _.isEmpty(this.state.seating) 
    ) {
      NotificationManager.error(
        "All fields are Must",
        "Input Error",
        3000,
        null,
        null
      );
    } else {
      
      let formData = new FormData();
      if (
        this.state.openTime !== this.state.closeTime
      ) {
        formData.append("branch_name", this.state.name);
        formData.append(
          "address",
          `${this.state.address}@${this.state.region}@${this.state.country}`
        );
        formData.append("phone_number", this.state.phoneNumber);
        var openTime = new Date(this.state.openTime);
        openTime = openTime.toLocaleTimeString();
        formData.append("open_time", openTime);
        var closeTime = new Date(this.state.closeTime);
        closeTime = closeTime.toLocaleTimeString();
        formData.append("close_time", closeTime);
        formData.append("branch_id", this.props.data.id);
        formData.append("strn", this.state.strn);
        if (this.state.image !== "")
          formData.append("branch_image", this.state.image);
        if (this.state.seating !== this.props.data.seating)
          formData.append("seating", JSON.stringify(this.state.seating));
        formData.append("longitude",this.state.longitude);
        formData.append("latitude",this.state.latitude);
        formData.append("radius",this.state.radius);
        this.props.editBranch(formData);
        this.toggleModal();
      } else {
        NotificationManager.error(
          "Close Time, Open Time must not be same",
          "Input Error",
          3000,
          null,
          null
        );
      }
    }
  };
  UNSAFE_componentWillReceiveProps(props) {
    if (props.modalOpen === true) {
      var dateTemp = new Date("Mon Apr 20 2020 00:00:00")
      if (this.state.address === "" && this.state.region === "" && this.state.country === "") {
        var str = props.data.address.split("@");
        this.setState({ address: str[0] });
        if (str[1] || str[2]) {
          this.setState({ country: str[2], region: str[1] });
        }
        if (this.state.openTime.getDate() === dateTemp.getDate()) {
          var date = new Date("Fri Apr 10 2020 " + props.data.open_time)
          this.setState({ openTime: date });
        }
        if (this.state.closeTime.getDate() === dateTemp.getDate()) {
          var date1 = new Date("Fri Apr 10 2020 " + props.data.close_time)
          this.setState({ closeTime: date1 });
        }
      }
      if (this.state.name === "") {

        this.setState({ name: props.data.branch_name });
      }
      if (this.state.phoneNumber === "") {
        this.setState({ phoneNumber: props.data.phone_number });
      }
      if (_.isEmpty(this.state.seating)) {
        this.setState({ seating: props.data.seating });
      }
      if (!_.isEmpty(props.data.branch_image) && this.state.image === "")
        this.setState({
          imagePreview: props.data.branch_image
        });
      if (this.state.longitude===69.3451)
      {
        this.setState({
          longitude: props.data.longitude
        }); 
      }
      if (this.state.latitude===30.3753)
      {
        this.setState({
          latitude: props.data.latitude
        }); 
      }
      if (this.state.radius===0)
      {
        this.setState({
          radius: props.data.radius
        }); 
      }
      if(this.state.strn==="")
      { 
        if(props.data.strn==="")
        {
          this.setState({strn:this.props.restaurant.strn});
        }
        else
        {
          this.setState({strn:props.data.strn});
        }
      }
    }
  }
  _onAddressChange = e => {
    this.setState({ address: e.target.value });
  };
  selectCountry = val => {
    this.setState({ country: val });
  };

  selectRegion = val => {
    this.setState({ region: val });
  };
  taxtoggleModal = () => {
    this.setState(
      {
        taxmodalOpen: !this.state.taxmodalOpen
      },
      () => {
        if (this.state.taxmodalOpen === false) this.toggleModal();
      }
    );
  };
  render() {
    return (
      <div>
        <DishesImportModal
          modalOpen={this.state.dishesModal}
          toggleModal={this.toggleDishesModal}
          branch={this.props.data}
        />
        <TaxModal
          modalOpen={this.state.taxmodalOpen}
          toggleModal={this.taxtoggleModal}
          branch={this.props.data}
          addTax={this.props.editBranch}
        />
        <Modal
          isOpen={this.props.modalOpen}
          toggle={this.props.toggleModal}
          wrapClassName="modal-right"
          backdrop="static"
        >
          <ModalHeader toggle={this.toggleModal}>
            Edit/Delete Branch
          </ModalHeader>
          <ModalBody>
            <label htmlFor="fileupload">
              <img
                className="modalImage"
                alt="editBranchImage"
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
              Branch Name<div style={{ color: "red" }}> *</div>
            </Label>
            <Input
              type="text"
              name="name"
              id="branchName"
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
            />
            <Label className="mt-4 d-flex">
              Branch Address<div style={{ color: "red" }}> *</div>
            </Label>
            <CountryDropdown
              style={{ width: "100%" }}
              value={this.state.country}
              onChange={val => this.selectCountry(val)}
            />
            <br />
            {this.state.country ? (
              <RegionDropdown
                style={{ width: "100%" }}
                country={this.state.country}
                value={this.state.region}
                onChange={val => this.selectRegion(val)}
              />
            ) : null}
            <Input
              type="textarea"
              placeholder={"Address Line"}
              value={this.state.address}
              onChange={e => this.setState({ address: e.target.value })}
            />




<Map isMarkerShown 
            lng={this.state.longitude} 
            lat={this.state.latitude} 
            setPosition={this.setPosition}
           />
          <br />
          <div className="d-flex align-self-stretch ">
            <Label className="mt-4 d-flex">
              Latitude<div style={{ color: "red" }}> *</div>
            </Label>  
            <Input
              type="number"
              readOnly="readonly"
              value={this.state.latitude}
            />
            <Label className="mt-4 d-flex">
              Longitude<div style={{ color: "red" }}> *</div>
            </Label>
            <Input
            readOnly="readonly"
              type="number"
              value={this.state.longitude}
            />
          </div>
          
          <div>
          <Label className="mt-4 d-flex">
              Radius<div style={{ color: "red" }}> *</div>
          </Label>
          <Input
             type="number"
             value={this.state.radius}
             onChange={e => 
              {
                this.setState({ radius: e.target.value })
              }
            }

            />
          </div>

          <Label className="mt-4 d-flex">
            Restaurant Strn<div style={{ color: "red" }}> *</div>
          </Label>
          <Input
            type="text"
            name="strn"
            id="strn"
            
            placeholder="Enter unique id"
            value={this.state.strn}
            onChange={e => {this.setState({ strn: e.target.value })
                
            }}
          />

            <Label className="mt-4 d-flex">
              Branch Phone Number<div style={{ color: "red" }}> *</div>
            </Label>
            <Input
              type="tel"
              name="number"
              id="phoneNumber"
              value={this.state.phoneNumber}
              onChange={e => {
                let phone = e.target.value;
                if (phone === "" || this.state.regexp.test(phone))
                  this.setState({ phoneNumber: phone })
              }
              }
            />
            <div className='d-flex'>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <>
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="Open Time*"
                  value={this.state.openTime}
                  onChange={data => {

                    this.setState({ openTime: data })
                  }}

                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />{" "}
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker-c"
                  label="Close Time*"
                  value={this.state.closeTime}
                  onChange={data => {

                    this.setState({ closeTime: data })
                  }}

                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
                </>
              </MuiPickersUtilsProvider>
            </div>

            <br />

            <Button
              className="mt-2 float-right"
              color="primary"
              outline
              onClick={this.handleNewSeating}
            >
              +
            </Button>
            <br />
            <Label className="mt-2 d-flex">Demography (Section-Tables)<div style={{ color: "red" }}> *</div></Label>
            {this.state.seating.map((seat, id) => (
              <div key={id} className="mt-1 d-flex">
                <Input
                  type="text"
                  placeholder={"Section Name (A,B)"}
                  value={seat.section}
                  onChange={this._onAddSections(id)}
                />{" "}
                <Input
                  type="number"
                  placeholder={"Number of tables"}
                  value={seat.table}
                  onChange={this._onAddTables(id)}
                />
                <Button color="link" onClick={this.handleRemoveSeating(id)}>
                  X
                </Button>
              </div>
            ))}
            <Button
              color="primary"
              size="lg"
              outline
              className="mt-2 float-right"
              onClick={this.taxtoggleModal}
            >
              Add tax (GST)
            </Button>{" "}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleDishesModal}>
              Branch QR
            </Button>
            <Button
              color="danger"
              onClick={() => {
                let x = window.confirm(
                  "Are you sure you want to delete branch"
                );
                if (x === true) {
                  this.props.deleteBranch(this.props.data.id);
                  return this.props.toggleModal();
                } else {
                  return this.props.toggleModal();
                }
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
      </div>
    );
  }
}

export default BranchEditModal;
