import React, { Component } from "react";
import Switch from '@material-ui/core/Switch';
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  FormText,
  Row,
  Col,
  CustomInput
} from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { Wizard, Steps, Step } from "react-albus";
import { injectIntl } from "react-intl";
import { BottomNavigation } from "../../components/wizard/BottomNavigation";
import { TopNavigation } from "../../components/wizard/TopNavigation";
import AppLayout from "../../layout/AppLayout";
import { connect } from "react-redux";
import {
  addService,
  uploadImage,
  editPersonalInfo,
  addRestaurantInfo,
  getSampleCategories,
  getUser,
  getRestaurant,
  
} from "../../redux/actions";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { NotificationManager } from "../../components/common/react-notifications";
import { NavLink } from "react-router-dom";
import Select from "react-select";
import _ from "lodash";
class Basic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{},
      flag:false,
      OnlineMenu:false,
      resturant_check:true,
      OrderManagement:false,
      InventoryManagement:false,
      PointOfSales:false,
      Analytics:false,
      disabled:false,
      name: this.props.authUser.user.name,
      strn:"",
      phoneNumber: "",
      restaurantName: "",
      restaurantPhoneNumber: "",
      country: "",
      region: "",
      restaurantAddress: "",
      facebookPage: "",
      restaurantTitle: "",
      restaurantDescription: "",
      speciality: "",
      accountString: "",
      agreement: true,
      image: null,
      clicked: false,
      sampleCategories: [],
      selectedCategories: [],
      imagePreview: require("../../assets/css/sass/img/add_image.png"),
      imagePreviewDP: require("../../assets/css/sass/img/add_image.png"),
      imageRestaurant: "",
      regexp: /^[0-9\b]+$/
    };
  }
  componentDidUpdate() {
    
    if (
      this.props.authUser.user &&
      this.state.name !== this.props.authUser.user.name
    ) {
      this.setState({ name: this.props.authUser.user.name });
      
    }
    if (
      !_.isEmpty(this.props.wizard.sampleCategories) &&
      _.isEmpty(this.state.sampleCategories)
    ) {
      this.setState({
        sampleCategories: this.props.wizard.sampleCategories.map(category => {
          return { value: category.id, label: category.name };
        })
      });
    }
    if(this.props.wizard.data && this.state.data !== this.props.wizard.data && this.state.flag===true)
    {
    //  console.log(this.props.wizard);
        this.update();
    }
    

  }
  update=()=>{
      this.setState({data:this.props.wizard.data})
        
          let obj={
            "digital_menu_management": this.state.OnlineMenu,
            "order_management": this.state.OrderManagement,
            "inventory_management": this.state.InventoryManagement,
            "pos_management": this.state.PointOfSales,
            "analytics_management": this.state.Analytics,
          }
          this.props.addService(obj);
      
  }
  componentDidMount() {
    this.props.getSampleCategories();
  }
  _onAddCategories = e => {
    this.setState({
      selectedCategories: e
    });
  };
  uploadImage = () => {
    let formData = new FormData();
    formData.append("profile_image", this.state.image);
    this.props.uploadImage(formData);
  };
  _onImageChange = e => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onloadend = e => {
      this.setState({
        imagePreview: [reader.result]
      });
    };
    this.setState({
      imageRestaurant: e.target.files[0]
    });
  };
  onClickNext = async (goToNext, steps, step) => {
  
   // console.log(this.props.authUser.user.restaurant_info_flag)
   //(steps[steps.indexOf(step) + 1].id)
    switch (step.id) {
      case "step1":

            
        if (!_.isEmpty(this.state.image)) this.uploadImage();
        if (this.state.name === "" || this.state.phoneNumber === "") {
          NotificationManager.error(
          "Must Fields left Blank",
          "Error",
          3000,
          null,
          null
          );
          return;
        }
      
        break;
        
      case "step2":
            //console.log("hello world");
         if (!_.isEmpty(this.state.image)) this.props.getUser();
          if (this.state.imageRestaurant !== "") {
            if (
              this.state.restaurantName === "" ||
              this.state.restaurantPhoneNumber === "" ||
              this.state.accountString === "" ||
              this.state.restaurantAddress === "" ) 
            {
              NotificationManager.error(
              "Must Fields left Blank",
              "Error",
              3000,
              null,
              null
            );
            return;
          }
        } else {
          NotificationManager.error(
            "Restaurant Image left Blank",
            "Error",
            3000,
            null,
            null
          );
          return;
        }
        
        break;
      
      
        case "step3":

          if (this.state.agreement === false) 
          {
            
          }
          else {
            NotificationManager.error(
              "You need to accept the terms and conditions",
              "Error",
              3000,
              null,
              null
            );
            return;
          }
  
          break;
      case "step4":
        if (this.state.agreement === false) {
          let formData = new FormData();
            formData.append("name", this.state.restaurantName);
            formData.append("phone_number", this.state.restaurantPhoneNumber);
            if (this.state.imageRestaurant)
            formData.append("restaurant_image", this.state.imageRestaurant);
            formData.append("description", this.state.restaurantDescription);
            formData.append("account_string", this.state.accountString);
            formData.append("strn", this.state.strn);
            formData.append(
              "address",
              `${this.state.restaurantAddress}@${this.state.region}@${this.state.country}`
            );
            formData.append(
              "category_list",
              JSON.stringify(
                this.state.selectedCategories.map(category => ({
                  id: category.value
                }))
              )
            );
            if(localStorage.getItem("noRestaurant") === "true")
            this.props.addRestaurantInfo(formData);

          let obj = {
            first_name: this.state.name
              .split(" ")
              .slice(0, -1)
              .join(" "),
            last_name: this.state.name
              .split(" ")
              .slice(-1)
              .join(" "),
            phone_number: this.state.phoneNumber,
            restaurant_info_flag: this.state.agreement
          };
          this.props.editPersonalInfo(obj);
          this.setState({flag:true}) 
        }
        
        break;
      default:
        break;
    }
    if(!_.isEmpty(this.props.authUser.user.restaurant_info_flag===true )){
     localStorage.setItem("isBasic", this.state.agreement)
    }
    step.isDone = true;
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    goToNext();
  };

  onClickPrev = (goToPrev, steps, step) => {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  };
  changeHandler = e => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onloadend = e => {
      this.setState({
        imagePreviewDP: [reader.result]
      });
    };
    this.setState({ image: e.target.files[0] });
  };
  selectCountry = val => {
    this.setState({ country: val });
  };

  selectRegion = val => {
    this.setState({ region: val });
  };
  setTrue=()=>{
    this.setState({
      PointOfSales:true,
      Analytics:true,
      OnlineMenu:true,
      OrderManagement:true
    })
  }
  manageAccesses=()=>{
    if(this.state.PointOfSales===false)
    {
      this.setState({PointOfSales:true,
        OnlineMenu:true,
        OrderManagement:true,
        Analytics:true
      })
    }
    else
    {
      this.setState({PointOfSales:false});
    }
  }
  render() {
    const { messages } = this.props.intl;
    return (
      <AppLayout>
        {/* {this.props.authUser.user.restaurant_info_flag===false ? */}
        <Card>
          <CardBody className="wizard wizard-default">
            <Wizard>
              <TopNavigation
                className="justify-content-center"
                disableNav={true}
              />
              
              <Steps>
                <Step
                  id="step1"
                  name={messages["wizard.step-name-1"]}
                  desc={messages["wizard.step-desc-1"]}
                >
                  <div className="wizard-basic-step">
                    <Form>
                      <FormGroup>
                        <div
                          style={{
                            float: "right",
                            alignItems: "center",
                            width: "36%"
                          }}
                        >
                          <strong className="d-flex justify-content-start">
                            <div className='d-flex'>Profile Picture <div style={{ color: "red" }}> *</div></div>
                          </strong>
                          <Label for="fileupload">
                            <img
                              className="modalImage"
                              alt="addProfileImg"
                              src={this.state.imagePreviewDP}
                            />
                          </Label>
                          <Input
                            className="modalButton"
                            type="file"
                            name="file"
                            id="imageFile"
                            accept="image/jpeg, image/jpg, image/gif, image/png"
                            onChange={this.changeHandler}
                          />
                          <FormText color="muted">
                            Upload your image in .jpg/.png format. Size
                            shouldn't be more than 3MB.
                          </FormText>
                        </div>
                        <div style={{ width: "50%" }}>
                          <Label className="d-flex">
                            <IntlMessages id="forms.name" />
                            <div style={{ color: "red" }}> *</div>
                          </Label>
                          <Input
                            type="text"
                            name="name"
                            placeholder={messages["forms.name"]}
                            value={this.state.name}
                            onChange={e => {
                              this.setState({ name: e.target.value });
                            }}
                          />
                          <br />
                          <Label className="d-flex mt-4">
                            <IntlMessages id="forms.phonenumber" />
                            <div style={{ color: "red" }}> *</div>
                          </Label>
                          <Input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="923XXXXXXXXX"
                            value={this.state.phoneNumber}
                            onChange={e => {
                              let phone = e.target.value
                              if (phone === '' || this.state.regexp.test(phone)) {
                                this.setState({ phoneNumber: phone });
                              }
                            }}
                          />
                        </div>
                      </FormGroup>
                    </Form>
                  </div>
                </Step>
                <Step
                  id="step2"
                  name={messages["wizard.step-name-2"]}
                  desc={messages["wizard.step-desc-2"]}
                >
                  
                  <div className="wizard-basic-step" >
                          
                    <Form>
                      <FormGroup>
                        <div
                          style={{
                            float: "right",
                            alignItems: "center",
                            width: "35%"
                          }}
                        >
                          <strong className="d-flex justify-content-start">
                            <div className='d-flex'>Restaurant Logo/Image <div style={{ color: "red" }}> *</div></div>
                          </strong>
                          <Label for="fileupload">
                            <img
                              className="modalImage"
                              alt="addImage"
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
                          <FormText color="muted">
                            Upload your Restaurant Image in .jpg/.png format. Size
                            shouldn't be more than 3MB.
                          </FormText>
                        </div>

                        <div style={{ width: "50%" }}>
                          <Label className="d-flex">
                            Business Name <div style={{ color: "red" }}> *</div>
                          </Label>

                          <Input
                            type="text"
                            name="restaurant_name"
                            placeholder={messages["forms.restaurantname"]}
                            value={this.state.restaurantName}
                            onChange={e => {
                              this.setState({ restaurantName: e.target.value }, () => {
                                var today = new Date();
                                var date = today.getFullYear() + "" + (today.getMonth() + 1) + "" + (today.getDate());
                                var val = this.state.restaurantName + date + Math.floor(Math.random() * Math.floor(99));
                                val = val.replace(/\s+/g, '')
                                this.setState({ accountString: val.toLowerCase() })
                              });
                            }}
                          />

                          <Label className="mt-1 d-flex">
                            Business Phone Number
                            <div style={{ color: "red" }}> *</div>
                          </Label>
                          <Input
                            type="tel"
                            name="restaurant_phone_number"
                            placeholder={"Phone Number"}
                            value={this.state.restaurantPhoneNumber}
                            onChange={e => {
                              let phone = e.target.value
                              if (phone === '' || this.state.regexp.test(phone)) {
                                this.setState({
                                  restaurantPhoneNumber: e.target.value
                                });
                              }

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
                            value={this.state.accountString}
                            onChange={e => {
                              this.setState({
                                accountString: e.target.value
                              });
                            }}
                          />

                          <FormText color="muted">
                            Account ID should be unique. Once set, it cannot be changed.
                          </FormText>

                          <Label className="mt-1 d-flex">
                            Business STRN
                            <div style={{ color: "red" }}> *</div>{" "}
                          </Label>
                          <Input
                            type="number"
                            name="restaurant_account_string"
                            placeholder={"Enter Unique Identifier"}
                            value={this.state.strn}
                            onChange={e => {
                              this.setState({
                                strn: e.target.value
                              });
                            }}
                          />
                        </div>

                        <Label className="mt-2">Business Tagline</Label>
                        <Input
                          type="textarea"
                          name="restaurant_description"
                          placeholder={messages["forms.restaurantdescription"]}
                          value={this.state.restaurantDescription}
                          onChange={e => {
                            this.setState({
                              restaurantDescription: e.target.value
                            });
                          }}
                        />
                        <Label className="mt-1 d-flex">
                          Business Address<div style={{ color: "red" }}> *</div>
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
                          value={this.state.restaurantAddress}
                          onChange={e =>
                            this.setState({ restaurantAddress: e.target.value })
                          }
                        />

                        <Label className="mt-1">
                          <IntlMessages id="forms.specialtiy" />
                        </Label>
                        <Select
                          className="react-select"
                          classNamePrefix="react-select"
                          name="dishselect"
                          isMulti
                          isSearchable
                          placeholder={"Select Types of Dishes Served"}
                          options={this.state.sampleCategories}
                          value={this.state.selectedCategories}
                          onChange={(...args) => this._onAddCategories(...args)}
                        />
                      </FormGroup>
                    </Form>
                        </div>
                </Step>
              
                <Step
                  id="step3"
                  name={messages["wizard.step-name-3"]}
                  desc={messages["wizard.step-desc-3"]}
                >
                  <div className="wizard-basic-step">
                    <Form>
                      <FormGroup>
                        <Label>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </Label>
                        <br />
                        <CustomInput
                          type="checkbox"
                          id="agreement"
                          onChange={() =>
                            this.setState({ agreement: !this.state.agreement })
                          }
                        >
                          <Label>
                            <IntlMessages id="forms.agreement" />
                          </Label>
                        </CustomInput>
                      </FormGroup>
                        </Form>
                  </div>
                </Step>

                <Step
                  id="step4"
                  name={messages["wizard.step-name-4"]}
                  desc={messages["wizard.step-desc-4"]}
                >
                    <div className="wizard-basic-step">
                    <Form>
                      <FormGroup>
                          <Row style ={{dislay:'flex',justifyContent:'center'}}>
                              <h1>
                                  Services 
                              </h1>
                          </Row>
                          <Row>

                            <Col xs="9">
                              <Label>
                              • Online Menu Management For Digital Menu Only.
                              </Label>
                            </Col>
                            <Col  xs="1">
                              <Switch disabled={this.state.PointOfSales}
                              onClick={()=>{this.setState({OnlineMenu:!this.state.OnlineMenu})}}
                              checked={this.state.OnlineMenu} color='primary'/>
                            </Col>
                          </Row>
                          <Row>

                            <Col xs="9">
                              <Label>
                              • Online Order Management.
                              </Label>
                            </Col>
                            <Col xs="1">
                              <Switch disabled={this.state.PointOfSales}
                              onClick={()=>{this.setState({OrderManagement:!this.state.OrderManagement})}}
                              checked={this.state.OrderManagement} 
                              color='primary'/>
                            </Col>
                          </Row>
                          <Row>

                            <Col xs="9">
                              <Label>
                              • Inventory Management.
                              </Label>
                            </Col>
                            <Col xs="1">
                              <Switch  checked={this.state.InventoryManagement}
                                onClick={()=>{this.setState({InventoryManagement:!this.state.InventoryManagement})}}

                              color='primary'/>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs="9">
                              <Label>
                              • Point Of Sales System.
                              </Label>
                            </Col>
                            <Col xs="1">
                              <Switch  checked={this.state.PointOfSales} color='primary' onClick={this.manageAccesses}/>
                            </Col>
                          </Row>
                          <Row>

                            <Col xs="9">
                              <Label>
                              • Analytics.
                              </Label>
                            </Col>
                            <Col xs="1">
                              <Switch disabled={this.state.PointOfSales} checked={this.state.Analytics} 
                              onClick={()=>{this.setState({Analytics:!this.state.Analytics})}}
                              color='primary'/>
                            </Col>
                          </Row>
                      </FormGroup>
                    </Form>
                  </div>
                </Step>
                <Step id="step5" hideTopNav={true}>
                  <div className="wizard-basic-step text-center">
                    <h2 className="mb-2">
                      <IntlMessages id="wizard.content-thanks" />
                    </h2>
                    <p>
                      <IntlMessages id="wizard.registered" />
                      <br />
                      <NavLink
                        to={`/app/manage/manage-branch`}
                        className="white"
                        style={{ textDecoration: "underline" }}
                      >
                        Go to Adding Branch!
                      </NavLink>
                        </p>
                  </div>
                </Step>
              </Steps>
              <BottomNavigation
                
                onClickNext={this.onClickNext}
                onClickPrev={this.onClickPrev}
                className="justify-content-center"
                
                prevLabel={messages["wizard.prev"]}
                nextLabel={messages["wizard.next"]}
              />
            </Wizard>
          </CardBody>
        </Card>
   {/*      :
         <Card>
         <CardBody className="wizard wizard-default">
           <Wizard>
             <TopNavigation
               className="justify-content-center"
               disableNav={true}
             />
             
              <div>
              <Steps>
              <Step
                  id="step4"
                  name={messages["wizard.step-name-4"]}
                  desc={messages["wizard.step-desc-4"]}
                >
                    <div className="wizard-basic-step">
                    <Form>
                      <FormGroup>
                          <Row style ={{dislay:'flex',justifyContent:'center'}}>
                              <h1>
                                  Services 
                              </h1>
                          </Row>
                          <Row>

                            <Col xs="9">
                              <Label>
                              • Online Menu Management For Digital Menu Only.
                              </Label>
                            </Col>
                            <Col  xs="1">
                              <Switch disabled ={this.state.PointOfSales} checked={this.state.PointOfSales===false?this.state.OnlineMenu :null}  onClick={()=>{this.setState({OnlineMenu:!this.state.OnlineMenu})}} color='primary'/>
                            </Col>
                          </Row>
                          <Row>

                            <Col xs="9">
                              <Label>
                              • Online Order Management.
                              </Label>
                            </Col>
                            <Col xs="1">
                              <Switch  disabled ={this.state.PointOfSales}  checked={this.state.PointOfSales===false?this.state.OrderManagement:null} onClick={()=>{this.setState({OrderManagement:!this.state.OrderManagement})}} color='primary'/>
                            </Col>
                          </Row>
                          <Row>

                            <Col xs="9">
                              <Label>
                              • Inventory Management.
                              </Label>
                            </Col>
                            <Col xs="1">
                              <Switch  checked={this.state.InventoryManagement} onClick={()=>{this.setState({InventoryManagement:!this.state.InventoryManagement})}} color='primary'/>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs="9">
                              <Label>
                              • Point Of Sales System.
                              </Label>
                            </Col>
                            <Col xs="1">
                              <Switch  checked={this.state.PointOfSales} color='primary' onClick={()=>{this.setState({PointOfSales:!this.state.PointOfSales})}}/>
                            </Col>
                          </Row>
                          <Row>

                            <Col xs="9">
                              <Label>
                              • Analytics.
                              </Label>
                            </Col>
                            <Col xs="1">
                              <Switch disabled ={this.state.PointOfSales}  checked={this.state.PointOfSales===false?this.state.Analytics:null}  onClick={()=>{this.setState({Analytics:!this.state.Analytics})}} color='primary'/>
                            </Col>
                          </Row>
                      </FormGroup>
                    </Form>
                  </div>
                </Step>
                <Step id="step5" hideTopNav={true}>
                  <div className="wizard-basic-step text-center">
                    <h2 className="mb-2">
                      <IntlMessages id="wizard.content-thanks" />
                    </h2>
                    <p>
                      <IntlMessages id="wizard.registered" />
                      <br />
                      <NavLink
                        to={`/app/manage/manage-branch`}
                        className="white"
                        style={{ textDecoration: "underline" }}
                      >
                        Go to Adding Branch!
                      </NavLink>
                        </p>
                  </div>
                </Step>
              </Steps>
              
              </div>
                <BottomNavigation
                
                onClickNext={this.onClickNext}
                onClickPrev={this.onClickPrev}
                className="justify-content-center"
                
                prevLabel={messages["wizard.prev"]}
                nextLabel={messages["wizard.next"]}
              />
            </Wizard>
          </CardBody>
   </Card>}*/}
             
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ authUser, wizard ,services}) => {
  return { authUser, wizard ,services};
};
export default connect(mapStateToProps, {
  getRestaurant,
  uploadImage,
  editPersonalInfo,
  addRestaurantInfo,
  getSampleCategories,
  getUser,
  addService
})(injectIntl(Basic));
